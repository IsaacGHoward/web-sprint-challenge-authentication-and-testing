const Users = require("../users/users-model");

const validateUsername = (req,res,next) => {
  Users.findByName(req.body.username)
    .then(user => {
      if(user)
        res.status(400).send({'message': 'username taken'})
      else 
        next();
    })
}

const checkUsernameExists = (req,res,next) => {
  Users.findByName(req.body.username)
    .then(user => {
      if(user)
        next();
      else 
        res.status(404).send({'message': 'invalid credentials'})
    })
}


const infoPresent = (req,res,next) => {
  if(!req.body.username || !req.body.password)
    res.send({'message': 'username and password required'});
  else 
    next();
}

module.exports = {
  validateUsername,
  checkUsernameExists,
  infoPresent
}
