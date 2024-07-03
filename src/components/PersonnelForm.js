import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PersonnelForm.css';

const PersonnelForm = () => {
  const [columns, setColumns] = useState([]);
  const [formData, setFormData] = useState({});
  const [married, setMarried] = useState(false);
  const [wifeColumns, setWifeColumns] = useState([]);
  const [wifeFormData, setWifeFormData] = useState({});

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/personnel/columns');
        const columnDetails = (response.data || []).filter(column => column.Field !== 'personnel_id');
        setColumns(columnDetails);
        setFormData(columnDetails.reduce((acc, col) => ({ ...acc, [col.Field]: '' }), {}));
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };

    const fetchWifeColumns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/wifeDetails/columns');
        const columnDetails = (response.data || []).filter(column => column.Field !== 'id' && column.Field !== 'personnel_id');
        setWifeColumns(columnDetails);
        setWifeFormData(columnDetails.reduce((acc, col) => ({ ...acc, [col.Field]: '' }), {}));
      } catch (error) {
        console.error('Error fetching wife columns:', error);
      }
    };

    fetchColumns();
    fetchWifeColumns();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleWifeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWifeFormData({
      ...wifeFormData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const personnelResponse = await axios.post('http://localhost:5000/personnel', formData);
      const personnelId = personnelResponse.data.insertId;
      console.log('Personnel ID:', personnelId);
      alert('Personnel added successfully!');

      const notificationData = {
        name: formData.first_name,
        message: 'Personal Data inserted',
        type: 'data entry',
        status: 'unread',
        personnelId: personnelId
      };
      await axios.post('http://localhost:5000/api/notifications', notificationData);

      if (married) {
        const wifeDetails = { ...wifeFormData, personnel_id: personnelId };
        console.log('Wife Details:', wifeDetails);
        await axios.post('http://localhost:5000/wifeDetails', wifeDetails);
        alert('Wife details added successfully!');
      }

      setFormData(columns.reduce((acc, col) => ({ ...acc, [col.Field]: '' }), {}));
      setWifeFormData(wifeColumns.reduce((acc, col) => ({ ...acc, [col.Field]: '' }), {}));
    } catch (error) {
      console.error('Error adding personnel or wife details:', error);
    }
  };

  const renderInput = (column, formData, handleChange) => {
    const { Field, Type } = column;
    if (Type.includes('varchar') || Type.includes('text')) {
      return (
        <input
          type="text"
          name={Field}
          value={formData[Field]}
          onChange={handleChange}
          className="form-control"
        />
      );
    } else if (Type.includes('int') || Type.includes('float') || Type.includes('double')) {
      return (
        <input
          type="number"
          name={Field}
          value={formData[Field]}
          onChange={handleChange}
          className="form-control"
        />
      );
    } else if (Type.includes('date') || Type.includes('timestamp')) {
      return (
        <input
          type="date"
          name={Field}
          value={formData[Field]}
          onChange={handleChange}
          className="form-control"
        />
      );
    } else if (Type.includes('boolean') || Type.includes('tinyint(1)')) {
      return (
        <input
          type="checkbox"
          name={Field}
          checked={!!formData[Field]} // Ensure it's boolean
          onChange={handleChange}
          className="form-check-input"
        />
      );
    } else {
      return (
        <input
          type="text"
          name={Field}
          value={formData[Field]}
          onChange={handleChange}
          className="form-control"
        />
      );
    }
  };

  return (
    <div className="personnel-form">
      <form onSubmit={handleSubmit}>
        <table className="table">
          <tbody>
            {columns.map((column) => (
              <tr key={column.Field}>
                <td>
                  <label className="col-form-label">
                    {column.Field.charAt(0).toUpperCase() + column.Field.slice(1)}:
                  </label>
                </td>
                <td>
                  {renderInput(column, formData, handleChange)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-group">
          <label className="col-form-label">Married:</label>
          <input
            type="checkbox"
            name="married"
            checked={married}
            onChange={(e) => setMarried(e.target.checked)}
            className="form-check-input"
          />
        </div>

        {married && (
          <table className="table">
            <thead>
              <tr>
                <th colSpan="2"><h3>Wife Details</h3></th>
              </tr>
            </thead>
            <tbody>
              {wifeColumns.map((column) => (
                <tr key={column.Field}>
                  <td>
                    <label className="col-form-label">
                      {column.Field.charAt(0).toUpperCase() + column.Field.slice(1)}:
                    </label>
                  </td>
                  <td>
                    {renderInput(column, wifeFormData, handleWifeChange)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button type="submit" className="btn btn-primary">Add Personnel</button>
      </form>
    </div>
  );
};

export default PersonnelForm;
