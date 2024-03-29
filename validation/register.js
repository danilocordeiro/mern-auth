const Validator = require('validator');
const cpfValidator = require('cpf-validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.identifier = !isEmpty(data.identifier) ? data.identifier : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password_confirmation = !isEmpty(data.password_confirmation) ? data.password_confirmation : '';

  if(Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid"
  }

  if(Validator.isEmpty(data.identifier)) {
    errors.identifier = "Identifier field is required";
  } else if (!cpfValidator.isValid(data.identifier)) {
    errors.identifier = "Identifier CPF is invalid"
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if(Validator.isEmpty(data.password_confirmation)) {
    errors.password_confirmation = "Confirm password field is required";
  }

  if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if(!Validator.equals(data.password, data.password_confirmation)) {
    errors.password_confirmation = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

}