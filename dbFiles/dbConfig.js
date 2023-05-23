const config = { // this is the server info we need to connect it
  user: "CodingWithKevin",
  password: "fue",
  server: "DESKTOP-CHB8DOQ",
  database: 'SQL Tutorial',
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    instancename: 'SQLEXPRESS' 
  },
  port: 1433
};

module.exports = config;