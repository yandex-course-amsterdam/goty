export const formData = {
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
  phone: {
    id: 'Phone',
    labelText: 'Phone',
    type: 'tel',
    name: 'phone',
    placeholder: 'Enter your phone number',
    pattern: '^(\\+7((\\(\\d{3}\\)\\s?\\d{3}-\\d{2}-\\d{2})|(\\s\\d{3}-\\d{3}-\\d{2}-\\d{2})|(\\d{10})))|(8\\d{10})$'
  }
}
