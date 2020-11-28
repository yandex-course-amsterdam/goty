export enum RequestMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE'
}

export enum RequestRoot {
  signUp = '/auth/signup',
  signIn = '/auth/signin',
  userInfo = '/auth/user',
  logout = '/auth/logout',
  profile = '/user/profile',
  password = '/user/password',
  avatar = '/user/profile/avatar'
}

export enum ContentType {
  json = 'application/json; charset=utf-8',
  formData = 'multipart/form-data',
  empty = ''
}
