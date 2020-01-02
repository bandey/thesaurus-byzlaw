var convict = require('convict');

// Define a schema 
var conf = convict({
  configFile: {
    doc: 'Path to additional config json file',
    env: 'CONF_FILE',
    format: String,
    default: '',
  },
  env: {
    doc: "Applicaton environment.",
    format: ["production", "development"],
    default: "development",
    env: "NODE_ENV"
  },
  port: {
    doc: "Port to bind.",
    format: "port",
    default: 8080,
    env: "SERV_PORT"
  },
  log: {
    doc: "HTTP logger mode.",
    format: ["common", "dev", "none"],
    default: "dev",
    env: 'LOG_MODE',
    arg: "log"
  },
  dbConnect: {
    doc: "Configuration string for MongoDB connection.",
    format: String,
    default: "mongodb://localhost/test",
    env: 'DB_CONNECT',
    arg: "db-connect"
  },
  dbAutoIndex: { // check indexes presence every run
    doc: "AutoIndex setting for MongoDB.",
    format: Boolean,
    default: false, // true - useful for development, false - faster for production
    arg: "db-auto-index"
  },
  dbDebug: {
    doc: "Debug mode for MongoDB.",
    format: Boolean,
    default: false,
    arg: "db-debug"
  },
  i18nDebug: {
    doc: "Debug mode for i18next.",
    format: Boolean,
    default: false,
    arg: "i18n-debug"
  }
});

if (conf.get('configFile')) {
  conf.loadFile(conf.get('configFile'));
}
 
// Perform validation 
conf.validate({allowed: 'strict'});
 
module.exports = conf;
