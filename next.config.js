const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

const defaultBasePath = '/nexus';
const defaultFallbackUrl = 'https://tamudatathon.com/:path*';

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname)]
  },
  module: true,
  env: {
    BASE_PATH: process.env.BASE_PATH || defaultBasePath
  },
  basePath: process.env.BASE_PATH || defaultBasePath,
  async rewrites() {
    return {
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/:path*',
          basePath: false,
          destination: process.env.FALLBACK_URL || defaultFallbackUrl
        }
      ]
    };
  }
};
