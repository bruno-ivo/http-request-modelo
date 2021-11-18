const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8000',
    secure: false,
    logLevel: 'debug',
    pathRewrite: {'^/api': ''}
  }
];

module.export = PROXY_CONFIG;
