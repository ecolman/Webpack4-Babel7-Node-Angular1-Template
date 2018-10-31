import * as shared from '../../server/config/shared';

// common configuration
const common = {
  env: shared.config.env,
  assets: shared.config.assets,
  isMobile: (() => {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
      return true;
    }
    if (/android/i.test(userAgent)) {
      return true;
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return true;
    }
    // this still could be a mobile os but no way to know for sure
    return false;
  })() // run immediately
};

// merge common and environment configs
export const config = Object.assign({},
  common,
  require(`./${common.env}`).config);
