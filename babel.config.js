module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1',
        },
        useBuiltIns: 'usage',
        corejs: '3.6.5',
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        [
          'inline-dotenv',
          {
            path: '.env',
          },
        ],
      ],
    },
    development: {
      plugins: [
        [
          'inline-dotenv',
          {
            path: '.env',
          },
        ],
      ],
    },
  },
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: ['.'],
      },
    ],
  ],
}
