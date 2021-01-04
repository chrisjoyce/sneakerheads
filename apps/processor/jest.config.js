module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/processor',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
  displayName: 'processor',
};
