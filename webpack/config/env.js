const fs = require('fs');
const path = require('path');

// Make sure that including paths.js after env.js will read .env variables.
const { NODE_ENV } = process.env;
const envFile = ((process.env.STAGING || NODE_ENV === 'test') && 'development') || NODE_ENV;

if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

const dotEnv = (name = '') => path.resolve(__dirname, '../../', `.env${name}`);

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  dotEnv``,
  dotEnv`.local`,
  dotEnv(`.${envFile}.local`),
  dotEnv(`.${envFile}`)
].filter(Boolean);


// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
let dotEnvVars = {};
let envs = null;
dotenvFiles.filter(fs.existsSync).forEach(dotenvFile => {
  envs = require('dotenv').config({//eslint-disable-line
    path: dotenvFile
  });

  dotEnvVars = Object.assign({}, dotEnvVars, envs.parsed);

  require('dotenv-expand')(envs)//eslint-disable-line
});

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

function getClientEnvironment() {
  const raw = Object.keys(dotEnvVars).reduce((env, key) => (
    Object.assign({}, env, { [key]: dotEnvVars[key] })
  ), {
    NODE_ENV: process.env.NODE_ENV || 'development'
  });

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => (
      Object.assign({}, env, { [key]: JSON.stringify(raw[key]) })
    ), {})
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
