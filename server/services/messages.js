module.exports = {
  common: {
    requiredBody: 'Request should have body!',
    requiredParametes: 'Request should have parameters!'
  },
  user: {
    requiredUsernameLength: (count) => `Username must be at least ${count} characters long`,
    incorrectEmail: 'Please provide a correct email address',
    requiredPasswordLength: (count) => `Password must be at least ${count} characters long`,
    invalidForm: 'Check the form for errors.',
    requiredEmail: 'Please provide your email address.',
    requiredPassword: 'Please provide your password.',
    registerSuccess: 'You have successfully signed up!',
    unprocessableForm: 'Could not process the form.',
    loginSuccess: 'You have successfully logged in!',
    fetchedUserWithoutAdminRole: 'Successfully fetched all user without \'Admin\' role',
    setAdminRoleSuccessfully: (user) => `Successfully set admin role to ${user.username}`
  },
  session: {
    createdSession: 'Successfully created session.',
    sessionExists: 'Session exists.',
    deletedSession: 'Successfully deleted session.'
  },
  category: {
    createdCategory: 'Successfully create category!',
    editedCategory: (catergory) => `Successfully edited category ${catergory.name}!`,
    fetchedCategories: 'Successfully fetched all categories!',
    fetchedCategory: (category) => `Successfully fetched category ${category.name}`,
    deletedCategory: (category) => `Successfully deleted category ${category.name}`
  },
  device: {
    fetchedDevices: 'Successfully fetched all devices!',
    fetchedDevice: 'Successfully fetched device!',
    createdDevice: 'Successfully created device!',
    editedDevice: 'Successfully edit device!',
    deletedDevice: 'Successfully deleted device!',
    notEnoughDevices: 'Sorry, not enough devices!',
    buyedDevices: (count) => `Successfully buyed ${count} devices!`,
    searchedDevices: (count) => `Successfully fetched ${count} devices`
  }
};