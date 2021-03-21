const db = require('../../data/dbConfig');

function find() {
  return db('users')
    .select('*')
}

function findById(user_id) {
  return db('users as u')
    .where('u.id', user_id)
    .first('u.id', 'u.username', 'u.password')
}

function findByName(username) {
  return db('users as u')
    .where('u.username', username)
    .first('u.id', 'u.username', 'u.password')
}

const add = async user => {
  let created_user_id;
  await db('users')
     .insert(user)
     .then(ids => {
      created_user_id = ids[0];
     });
  return findById(created_user_id);
 }

module.exports = {
  find,
  findById,
  findByName,
  add
};