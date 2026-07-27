// .cjs porque el package.json declara "type": "module".
module.exports = {
  testEnvironment: 'jest-fixed-jsdom',
  roots: ['<rootDir>/tests/jest'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest/setup.ts'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.(css|less|scss)$': '<rootDir>/tests/jest/styleStub.cjs',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: { '^.+\\.(m|c)?[jt]sx?$': 'babel-jest' },
  // Jest no transforma node_modules por defecto, pero MSW y su árbol de
  // dependencias se publican solo como ESM.
  transformIgnorePatterns: [
    'node_modules/(?!(msw|@mswjs|@bundled-es-modules|until-async|rettime|outvariant|strict-event-emitter|headers-polyfill|is-node-process|graphql|tough-cookie|universalify|@open-draft\/deferred-promise)/)',
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['src/main.tsx', 'src/mocks/', 'src/setupTests.ts'],
}
