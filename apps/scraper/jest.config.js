module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/scraper',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
  displayName: 'scraper',
};
