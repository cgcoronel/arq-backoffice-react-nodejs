const process = require('process');
const config = require('../../config');
const pkg = require('../../package.json');

const { killTimeout } = config.server;

//On server internal error.
const onServerError = () => logger.error({ message: `Server error` });

//On server start.
const onListen = (port) => {
  console.info(`---> ${pkg.name} <---\n`);
  console.info(`${pkg.name}:${pkg.version} - Running on port: ${port}`);
};

//When the process receive kill signal.
const onProcessKill = (server) => {
  console.info('Service termination signal received');

  setTimeout(() => {
    console.info('Finishing server');
    server.close(() => process.exit(0));
  }, killTimeout);
};

//When in the server happen a uncaugth exception.
const onException = (err) => console.log({ message: err });

module.exports = {
  onListen,
  onProcessKill,
  onServerError,
  onException,
};
