export const FORM_DATA = {
  name: {
    id: 'Name',
    labelText: 'Name',
    type: 'text',
    name: 'first_name',
    placeholder: 'Enter your name',
    pattern: '^([\\w\\W]{2,30})$'
  },
  surname: {
    id: 'Surname',
    labelText: 'Surname',
    type: 'text',
    name: 'second_name',
    placeholder: 'Enter your surname',
    pattern: '^([\\w\\W]{2,30})$'
  },
  login: {
    id: 'Login',
    labelText: 'Login',
    type: 'text',
    name: 'login',
    placeholder: 'Enter your login',
    pattern: '^([\\w\\W]{2,30})$'
  },
  email: {
    id: 'Email',
    labelText: 'Email',
    type: 'email',
    name: 'email',
    placeholder: 'Enter your email',
    pattern: '^\\w+([\\.\\-\\]?\\w+)@\\w+([\\.\\-]?\\w+)*(\\.\\w{2,8})$'
  },
  password: {
    id: 'Password',
    labelText: 'Password',
    type: 'password',
    name: 'password',
    placeholder: 'Enter your password',
    pattern: '^([\\w\\W]{8,30})$'
  },
  oldPassword: {
    id: 'OldPassword',
    labelText: 'Old Password',
    type: 'password',
    name: 'oldPassword',
    placeholder: 'Enter your old password',
    pattern: '^([\\w\\W]{8,30})$'
  },
  newPassword: {
    id: 'NewPassword',
    labelText: 'New Password',
    type: 'password',
    name: 'newPassword',
    placeholder: 'Enter your new password',
    pattern: '^([\\w\\W]{8,30})$'
  },
  phone: {
    id: 'Phone',
    labelText: 'Phone',
    type: 'tel',
    name: 'phone',
    placeholder: 'Enter your phone number',
    pattern: '^(\\+7((\\(\\d{3}\\)\\s?\\d{3}-\\d{2}-\\d{2})|(\\s\\d{3}-\\d{3}-\\d{2}-\\d{2})|(\\d{10})))|(8\\d{10})$'
  },
  displayName: {
    id: 'DisplayName',
    labelText: 'Display Name',
    type: 'text',
    name: 'display_name',
    placeholder: 'Enter your display name',
    pattern: '^([\\w\\W]{2,30})$'
  },
  profilePicture: {
    id: 'ProfilePicture',
    labelText: 'Profile picture',
    type: 'file',
    name: 'avatar',
    placeholder: 'Choose file'
  }
}
