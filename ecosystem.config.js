module.exports = {
  apps: [
    {
      name: 'transaction-matcher',
      script: 'dist/main.js',
      env: {
        PORT: 3010,
      },
    },
  ],
}
