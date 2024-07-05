const db = require('../db');

const Personnel = {
  getPersonnel: (callback) => {
    db.query('SELECT * FROM armypersonal', callback);
  },

  getPersonnelDetails: (serviceNumber, callback) => {
    db.query('SELECT * FROM armypersonal WHERE service_number = ?', [serviceNumber], callback);
  },

  getWife: (serviceNumber, callback) => {
    db.query('SELECT * FROM armywife WHERE service_number = ?', [serviceNumber], callback);
  },

  getChild: (serviceNumber, callback) => {
    db.query('SELECT * FROM armychild WHERE service_number = ?', [serviceNumber], callback);
  },

  getColumn: (table, callback) => {
    db.query(`SHOW COLUMNS FROM ${table}`, callback);
  },

  insertPersonnel: (personnelData, callback) => {
    const query = 'INSERT INTO armypersonal SET ?';
    db.query(query, personnelData, callback);
  },
  insertWife: (wifeData, callback) => {
    const query = 'INSERT INTO armywife SET ?';
    db.query(query, wifeData, callback);
  },
  insertChild: (childData, callback) => {
    const query = 'INSERT INTO armychild SET ?';
    db.query(query, childData, callback);
  }
};

module.exports = Personnel;
