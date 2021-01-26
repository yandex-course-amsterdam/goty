import * as Yup from 'yup'

export const VALIDATION_SCHEMA = {
  first_name: Yup.string()
    .matches(/^([\w\W]{2,30})$/, 'Name must be between 2 and 30 characters')
    .required('Name is required'),
  second_name: Yup.string()
    .matches(/^([\w\W]{2,30})$/, 'Surname must be between 2 and 30 characters')
    .required('Surname is required'),
  display_name: Yup.string()
    .matches(
      /^([\w\W]{2,30})$/,
      'Display name must be between 2 and 30 characters'
    )
    .required('Display name is required'),
  login: Yup.string()
    .matches(/^([\w\W]{2,30})$/, 'Login must be between 2 and 30 characters')
    .required('Login is required'),
  email: Yup.string()
    .matches(
      /^\w+([.\-\]?\w+)@\w+([.-]?\w+)*(\.\w{2,8})$/,
      'Email must be valid'
    )
    .required('Email is required'),
  password: Yup.string()
    .matches(/^([\w\W]{8,30})$/, 'Password must be between 8 and 30 characters')
    .required('Password is required'),
  phone: Yup.string()
    .matches(
      /^(\+7((\(\d{3}\)\s?\d{3}-\d{2}-\d{2})|(\s\d{3}-\d{3}-\d{2}-\d{2})|(\d{10})))|(8\d{10})$/,
      'Phone must be valid'
    )
    .required('Phone is required'),
  comment: Yup.string().required('Comment is required')
}
