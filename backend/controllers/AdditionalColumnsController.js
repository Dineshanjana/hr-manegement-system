//backend\controllers\AdditionalColumnsController.js
const AddColumns = require('../models/AdditionalColumns');

const AddColumnsController = {

    insertColumns: (req, res) => {
        const { columnName, dataType } = req.body;
        AddColumns.insertColums('additionalpersonnel', columnName, dataType, (err, results) => {
            if (err) {
                console.error('Error Fetch for Insert Personnel Columns', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.json({ status: 200, message: 'Column Added SuccessFully' });
        })
    },

    insertwifeColumns: (req, res) => {
        const { columnName, dataType } = req.body;
        AddColumns.insertColums('additionalwife', columnName, dataType, (err, results) => {
            if (err) {
                console.error('Error Fetch for Insert Wife Columns', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ status: 200, message: ' Wife Column Added SuccessFully' });
        })
    },

    insertchildColumns: (req, res) => {
        const { columnName, dataType } = req.body;

        AddColumns.insertColums('additionalchild', columnName, dataType, (err, results) => {
            if (err) {
                console.error('Error Fetch for Insert Child Columns', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ status: 200, message: 'Child Column Added SuccessFully' });
        })
    }
   
}

module.exports = AddColumnsController;