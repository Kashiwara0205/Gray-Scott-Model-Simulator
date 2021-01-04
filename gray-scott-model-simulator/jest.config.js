module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '\\.css$': '<rootDir>/tests/styleMock.js'
  },
  setupFiles:['<rootDir>/tests/canvasMock.js']
}
