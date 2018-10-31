/*eslint no-process-env:0*/

// SHARED server config
export const config = {
  env: process.env.NODE_ENV || 'local',
  assets: {
    host: process.env.ASSET_HOST || ''
  }
};
