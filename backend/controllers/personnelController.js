const Personnel = require('../models/Personnel');

const personnelController = {
  getAll: (req, res) => {
    Personnel.getAll((err, results) => {
      if (err) {
        console.error('Error fetching all personnel:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  },
  

  create: (req, res) => {
    const newPersonnel = req.body;
    Personnel.create(newPersonnel, (err, result) => {
      if (err) {
        console.error('Error creating new personnel:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(201).json({ insertId: result.insertId });
    });
  },

  getColumns: (req, res) => {
    Personnel.getColumns((err, results) => {
      if (err) {
        console.error('Error fetching personnel columns:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  },

  addColumn: (req, res) => {
    const { columnName, columnType } = req.body;
    Personnel.addColumn(columnName, columnType, (err, result) => {
      if (err) {
        console.error('Error adding column:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(201).send(`Column ${columnName} added successfully.`);
    });
  },

  getById: (req, res) => {
    const personnelId = req.params.id;
    Personnel.getById(personnelId, (err, results) => {
      if (err) {
        console.error(`Error fetching personnel with ID ${personnelId}:`, err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ message: 'Personnel not found' });
        return;
      }
      res.status(200).json(results[0]);
    });
  },

  getByServiceNumber: (req, res) => {
    const serviceNumber = req.params.service_number;
    Personnel.getByServiceNumber(serviceNumber, (err, results) => {
      if (err) {
        console.error(`Error fetching personnel with service number ${serviceNumber}:`, err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ message: 'Personnel not found' });
        return;
      }
      res.status(200).json(results[0]);
    });
  },
};

module.exports = personnelController;
