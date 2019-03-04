module.exports = {
  user: {
    requiredUsernameLength: (count) => `Username must be at least ${count} characters long`,
    incorrectEmail: 'Please provide a correct email address',
    requiredPasswordLength: (count) => `Password must be at least ${count} characters long`,
    invalidForm: 'Check the form for errors.',
    requiredEmail: 'Please provide your email address.',
    requiredPassword: 'Please provide your password.',
    registerSuccess: 'You have successfully signed up! Now you should be able to log in.',
    unprocessableForm: 'Could not process the form.',
    loginSuccess: 'You have successfully logged in!'
  }
};