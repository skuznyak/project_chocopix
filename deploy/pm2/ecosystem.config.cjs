module.exports = {
  apps: [
    {
      name: 'chocopix-api',
      cwd: './backend',
      script: 'dist/app.js',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
