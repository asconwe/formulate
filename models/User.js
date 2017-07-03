const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        index: { unique: true }
    },
    password: String,
});

userSchema.methods.isValidPassword = function comparePassword(password) {
  bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;