module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'app/(.*)$': '<rootDir>/src/app/$1',
    // 'images/(.*)$': '<rootDir>/src/images/$1',
    'icons/(.*)$': '<rootDir>/src/icons/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
    '\\.(css)$': '<rootDir>/tests/__mocks__/styleMock.js'
  }
}
