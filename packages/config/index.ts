const { NODE_ENV } = process.env;
export const CONFIG = Object.freeze({
  STAGE: NODE_ENV,
  PORT: NODE_ENV === 'development' ? 4000 : 443,
  // HTTPS: STAGE === 'prod',
  // SSL_CRT_FILE: STAGE === 'prod' ? '/home/opc/certificate.crt' : '',
  // SSL_KEY_FILE: STAGE === 'prod' ? '/home/opc/private.key' : '',
});
