//backend\models\Personnel.js

const { callback } = require('chart.js/helpers');
const db = require('../db');

const Personnel = {
  getPersonnel: (tableName,callback) => {
    db.query(`SELECT * FROM ${tableName}`, callback);
  },

  getPersonnelDetails: (serviceNumber, callback) => {
    db.query('SELECT * FROM  personnel WHERE service_number = ?', [serviceNumber], callback);
  },

  getWife: (serviceNumber, callback) => {
    db.query('SELECT * FROM wifedetails WHERE service_number = ?', [serviceNumber], callback);
  },

  getChild: (serviceNumber, callback) => {
    db.query('SELECT * FROM childdetails WHERE service_number = ?', [serviceNumber], callback);
  },

  getColumn: (table, callback) => {
    db.query(`SHOW COLUMNS FROM ${table}`,callback);
  },
  
  insertPersonnel: (personnelData, callback) => {
    const query = 'INSERT INTO personal SET ?';
    db.query(query, personnelData, callback);
  },

  insertWife: (wifeData, callback) => {
    const query = 'INSERT INTO wifedetails SET ?';
    db.query(query, wifeData, callback);
  },

  insertChild: (childData, callback) => {
    const query = 'INSERT INTO childdetails SET ?';
    db.query(query, childData, callback);
  }
};

module.exports = Personnel;
