const db = require('../../data/dbConfig');

function find() {
  return db('users')
    .select('*')
}

function findById(user_id) {
  return db('users as u')
    .where('u.id', user_id)
    .first('u.id', 'u.username')
}

function findByName(username) {
  return db('users as u')
    .where('u.username', username)
    .first('u.id', 'u.username')
}

module.exports = {
  find,
  findById,
  findByName
};