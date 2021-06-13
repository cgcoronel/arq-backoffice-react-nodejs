const config = {
  server: {
    port: process.env.SERVER_PORT,
    killTimeout: process.env.SERVER_KILLTIMEOUT,
  },
  aws: {
    region: process.env.AWS_REGION,
  },
};

module.exports = {
  ...config,
};
