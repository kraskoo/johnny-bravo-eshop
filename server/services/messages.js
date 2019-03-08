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
    createdSuccess: 'Successfully created session.',
    sessionExists: 'Session exists.',
    deletedSuccess: 'Successfully deleted session.'
  },
  category: {
    createdCategory: 'Successfully create category!',
    requiredBody: 'Request should have body!',
    editedCategory: (catergory) => `Successfully edited category ${catergory.name}!`,
    fetchedCategories: 'Successfully fetched all categories!'
  },
  tag: {
    createdTag: 'Successfully created tag!',
    requiredBody: 'Request should have body!',
    fetchedTags: 'Successfully fetched all tags!'
  },
  device: {
    fetchedDevices: 'Successfully fetched all devices!',
    fetchedDevice: 'Successfully fetched device!',
    createdDevice: 'Successfully created device!',
    deletedDevice: 'Successfully deleted device!'
  }
};