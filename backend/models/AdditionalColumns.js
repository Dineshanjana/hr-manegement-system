//backend\models\AdditionalColumns.js
const { callback } = require('chart.js/helpers');
const db = require('../db');

const addColumns = {
    insertColums: (tableName, columnName, dataType, callback) => {
        db.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${dataType}`, callback);
    },
    insertData:(tableName, columnName, value, callback) =>{
        db.query(`INSERT INTO ${tableName}(${columnName}) VALUES (?)`, [value], callback);
    }
};

module.exports = addColumns;
