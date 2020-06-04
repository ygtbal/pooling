const path = require('path');
const APP_ROOT = path.dirname(require.main.filename);
const SEP = path.sep;

module.exports = {
  db: {
    host: '127.0.0.1',
    name: 'pool_app_cloud',
    port: '27017',
    prefix: 'poolapp',
  },
  private: {
    secret: '.]:x1{$A^Ts_m%iXJ$p^{;yUBT8uPJ<.`med:t/T`K=8l%d#!D0m9lxmkK4#_L*',
    salt: '.NHjN2r1P`*qst_ucBG2',
  },
  cloud: {
    secret: 'b1DVHL1,mZ%>6:]#f<HJ6~l(GhN?dHMx>/w2t$"}LP#b<bN|5"sDE*-p|S&BtpJ',
    salt: 'aJ",^}A*r+s.CPc$[V:(0',
  },
  server: {
    port: 3000,
    ip: '127.0.0.1',
  },
};