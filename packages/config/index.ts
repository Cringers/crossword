const { NODE_ENV } = process.env;
export const CONFIG = Object.freeze({
  STAGE: NODE_ENV,
  FRONTEND_PORT: NODE_ENV === 'development' ? 3000 : 443,
  BACKEND_PORT: 4000,
  SSL_CERT: NODE_ENV === 'production' ? '/home/opc/certificate.crt' : '',
  SSL_KEY: NODE_ENV === 'production' ? '/home/opc/private.key' : '',
});
