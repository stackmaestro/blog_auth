const bcrypt = require('bcrypt');
const mongoose = require('../services/MongooseService');
const UserValidator = require('../validators/UserValidators');
const errorMessages = require('../util/error');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, errorMessages.usernameRequired],
    },
    email: {
      type: String,
      required: [true, errorMessages.emailRequired],
      unique: [true, errorMessages.emailRegistered],
      validate: UserValidator.emailValidator,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: 'users' }
);

UserSchema.pre('save', async function postsave(next) {
  const hash = await bcrypt.hash(this.password, 5);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function validatePassword(password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
