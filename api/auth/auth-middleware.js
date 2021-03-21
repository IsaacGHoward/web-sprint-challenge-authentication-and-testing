const Users = require("../users/users-model");

const validateUsername = (req,res,next) => {
  Users.findByName(req.body.username)
    .then(user => {
      if(user)
        res.send({'message': 'username taken'})
      else 
        next();
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
  infoPresent
}
