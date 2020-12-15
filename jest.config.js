module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    'app/(.*)$': '<rootDir>/src/app/$1',
    icons: '<rootDir>/src/icons',
    'uikit/(.*)$': '<rootDir>/src/uikit/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
    '\\.(css)$': '<rootDir>/tests/__mocks__/styleMock.js'
  }
}
