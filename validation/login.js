const Validator = require('validator');
const cpfValidator = require('cpf-validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.identifier = !isEmpty(data.identifier) ? data.identifier : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // if(Validator.isEmpty(data.email)) {
  //   errors.email = "Email field is required";
  // } else if (!Validator.isEmail(data.email)) {
  //   errors.email = "Email is invalid"
  // }

  if(Validator.isEmpty(data.identifier)) {
    errors.identifier = "Identifier field is required";
  } else if (!cpfValidator.isValid(data.identifier)) {
    errors.identifier = "Identifier CPF is invalid"
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

}