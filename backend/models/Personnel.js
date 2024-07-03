const db = require('../db'); // Assuming db.js exports the MySQL connection

const Personnel = {
  getAll: (callback) => {
    db.query('SELECT * FROM personnel', callback);
  },
  

  getById: (id, callback) => {
    db.query('SELECT * FROM personnel WHERE personnel_id = ?', [id], callback);
  },

  getByServiceNumber: (serviceNumber, callback) => {
    const query = `
      SELECT p.*, w.*
      FROM personnel p
      INNER JOIN wifeDetails w ON p.personnel_id = w.personnel_id
      WHERE p.service_number = ?
    `;
    db.query(query, [serviceNumber], callback);
  },


  create: (personnel, callback) => {
    const sql = 'INSERT INTO personnel SET ?';
    db.query(sql, personnel, callback);
  },

  update: (id, personnel, callback) => {
    const sql = 'UPDATE personnel SET ? WHERE personnel_id = ?';
    db.query(sql, [personnel, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM personnel WHERE personnel_id = ?', [id], callback);
  },

  getColumns: (callback) => {
    db.query('SHOW COLUMNS FROM personnel', callback);
  },

  addColumn: (columnName, columnType, callback) => {
    const sql = `ALTER TABLE personnel ADD COLUMN ?? ${columnType}`;
    db.query(sql, [columnName], callback);
  },
};

module.exports = Personnel;
