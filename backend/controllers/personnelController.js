//backend\controllers\personnelController.js

const Personnel = require('../models/Personnel');

const personnelController = {
  getPersonnel: (req, res) => {
    Personnel.getPersonnel('personnel', (err, results) => {
      if (err) {
        console.error('Error fetching personnel', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  },
  getWifeAll: (req, res) => {
    Personnel.getPersonnel('wifedetails', (err, results) => {
      if (err) {
        console.error('Error fetching wife', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results)
    });

  },
  getChildAll: (req, res) => {
    Personnel.getPersonnel('childdetails', (err, results) => {
      if (err) {
        console.error('Error fetching child', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    })
  },
  getWife: (req, res) => {
    const { serviceNumber } = req.params;
    Personnel.getWife(serviceNumber, (err, results) => {
      if (err) {
        console.error('Error fetching wife data', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  },
  getChild: (req, res) => {
    const { serviceNumber } = req.params;
    Personnel.getChild(serviceNumber, (err, results) => {
      if (err) {
        console.error('Error fetching child data', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  },
  getDetails: (req, res) => {
    const { serviceNumber } = req.params;
    Personnel.getPersonnelDetails(serviceNumber, (err, results) => {
      if (err) {
        console.error('Error Fetching all details', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  },

  getColumn: (req, res) => {
   Personnel.getColumn('personnel', (err, results) =>{
    if(err)
    {
      console.error('Error Fetching all details', err);
      res.status(500).json({error : 'Internal Server Error'});
      return;
    }
    res.json(results);
   });
  },
 
  getColumnWife: (req, res) => {
    Personnel.getColumn('wifedetails', (err, results) => {
      if (err) {
        console.error('Error fetching wife columns', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  },

  getColumnChild: (req, res) => {
    Personnel.getColumn('childdetails', (err, results) => {
      if (err) {
        console.error('Error fetching child columns', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  },


  insertPersonnel: (req, res) => {
    const personnelData = req.body;
    Personnel.insertPersonnel(personnelData, (err, results) => {
      if (err) {
        console.error('Error inserting personnel data', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ status: 200, message: 'Personnel data inserted', insertId: results.insertId });
    });
  },


  insertWife: (req, res) => {
    const wifeData = req.body;
    Personnel.insertWife(wifeData, (err, results) => {
      if (err) {
        console.error('Error inserting wife data', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ status: 200, message: 'Wife data inserted' });
    });
  },

  insertChild: (req, res) => {
    const childData = req.body;
    Personnel.insertChild(childData, (err, results) => {
      if (err) {
        console.error('Error inserting child data', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ status: 200, message: 'Child data inserted' });
    });
  }
};



module.exports = personnelController;
