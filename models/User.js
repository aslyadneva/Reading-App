const validator = require('validator')
const usersCollection = require('../db').collection("users")

const User = function (data) {
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function () {
  if (typeof(this.data.username) !== 'string') {this.data.username = ''}
  if (typeof(this.data.email) !== 'string') {this.data.email = ''}
  if (typeof(this.data.password) !== 'string') {this.data.password = ''}

  // get rid of any useless properties 
  this.data = {
    username: this.data.username.trim().toLowerCase(), 
    email: this.data.email.trim().toLowerCase(), 
    password: this.data.password
  }
}

User.prototype.validate = function () {
  //Username validatio
  if (this.data.username === '') {
    this.errors.push('You must provide a username')
  }
  if (this.data.username !== '' && !validator.isAlphanumeric(this.data.username)) {
    this.errors.push('Username can only contain letters and numbers')
  }
  if (this.data.username.length > 0 && this.data.password.length < 3) {
    this.errors.push('Username must be atleast 3 characters')
  }
  if (this.data.username.length > 30) {
    this.errors.push('Username cannot exceed 30 characters')
  }

  //Email validation 
  if (!validator.isEmail(this.data.email)) {
    this.errors.push('You must provide a valid email')
  }

  //Password validation 
  if (this.data.password === '') {this.errors.push('You must create a password')}
  if (this.data.password.length > 0 && this.data.password.length < 12) {
    this.errors.push('Password must be atleast 12 characters')
  }
  if (this.data.password.length > 100) {
    this.errors.push('Password cannot exceed 100 characters')
  }
}

User.prototype.register = function () {
  //clean & validate user data 
  this.cleanUp()
  this.validate()

  //only if there are no errors, then save the user data to DB 
  if (!this.errors.length) {
    usersCollection.insertOne(this.data)
  }
}


module.exports = User