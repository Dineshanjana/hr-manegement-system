//src\components\PersonnelForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PersonnelForm.css';

const PersonnelForm = () => {
  const [columns, setColumns] = useState([]);
  const [formData, setFormData] = useState({});
  const [married, setMarried] = useState(false);
  const [wifeColumns, setWifeColumns] = useState([]);
  const [wifeFormData, setWifeFormData] = useState({});
  const [hasChildren, setHasChildren] = useState(false);
  const [childrenColumns, setChildrenColumns] = useState([]);
  const [childrenData, setChildrenData] = useState([]);

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
        const response = await axios.get('http://localhost:5000/personnel/columnswife');
        const columnDetails = (response.data || []).filter(column => column.Field !== 'wife_id' && column.Field !== 'personnel_id');
        setWifeColumns(columnDetails);
        setWifeFormData(columnDetails.reduce((acc, col) => ({ ...acc, [col.Field]: '' }), {}));
      } catch (error) {
        console.error('Error fetching wife columns:', error);
      }
    };

    const fetchChildrenColumns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/personnel/columnschild');
        const columnDetails = (response.data || []).filter(column => column.Field !== 'child_id' && column.Field !== 'personnel_id');
        setChildrenColumns(columnDetails);
      } catch (error) {
        console.error('Error fetching children columns:', error);
      }
    };

    fetchColumns();
    fetchWifeColumns();
    fetchChildrenColumns();
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

  const handleChildChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedChildrenData = [...childrenData];
    updatedChildrenData[index] = {
      ...updatedChildrenData[index],
      [name]: type === 'checkbox' ? checked : value,
    };
    setChildrenData(updatedChildrenData);
  };

  const addChildForm = () => {
    setChildrenData([...childrenData, childrenColumns.reduce((acc, col) => ({ ...acc, [col.Field]: '' }), {})]);
  };

  const removeChildForm = (index) => {
    const updatedChildrenData = [...childrenData];
    updatedChildrenData.splice(index, 1);
    setChildrenData(updatedChildrenData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add personnel details
      const personnelResponse = await axios.post('http://localhost:5000/personnel', formData);
      const personnelId = personnelResponse.data.insertId;
      const serviceNumber = formData.service_number;

      // Add notification
      const notificationData = {
        name: formData.first_name,
        message: 'Personal Data inserted',
        type: 'data entry',
        status: 'unread',
        personnelId: personnelId
      };
      await axios.post('http://localhost:5000/api/notifications', notificationData);

      // Add wife details if married
      if (married) {
        const wifeDetails = { ...wifeFormData, personnel_id: personnelId, service_number: serviceNumber };
        await axios.post('http://localhost:5000/personnel/wife', wifeDetails);
      }

      // Add children details if has children
      if (hasChildren) {
        for (const child of childrenData) {
          const childDetails = { ...child, personnel_id: personnelId, service_number: serviceNumber };
          await axios.post('http://localhost:5000/personnel/child', childDetails);
        }
      }

      // Reset form data
      setFormData(columns.reduce((acc, col) => ({ ...acc, [col.Field]: '' }), {}));
      setWifeFormData(wifeColumns.reduce((acc, col) => ({ ...acc, [col.Field]: '' }), {}));
      setChildrenData([]);
      setMarried(false);
      setHasChildren(false);

      alert('Personnel and family details added successfully!');
    } catch (error) {
      console.error('Error adding personnel or family details:', error);
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
          checked={!!formData[Field]}
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
            onChange={(e) => {
              setMarried(e.target.checked);
              if (!e.target.checked) {
                setHasChildren(false); // Reset hasChildren when married is unchecked
              }
            }}
            className="form-check-input"
          />
        </div>

        {married && (
          <>
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
            <div className="form-group">
              <label className="col-form-label">Has Children:</label>
              <input
                type="checkbox"
                name="hasChildren"
                checked={hasChildren}
                onChange={(e) => setHasChildren(e.target.checked)}
                className="form-check-input"
              />
            </div>
          </>
        )}

        {hasChildren && (
          <div className="children-forms">
            {childrenData.map((childData, index) => (
              <div key={index} className="child-form">
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan="2"><h3>Child Details #{index + 1}</h3></th>
                    </tr>
                  </thead>
                  <tbody>
                    {childrenColumns.map((column) => (
                      <tr key={column.Field}>
                        <td>
                          <label className="col-form-label">
                            {column.Field.charAt(0).toUpperCase() + column.Field.slice(1)}:
                          </label>
                        </td>
                        <td>
                          {renderInput(column, childData, (e) => handleChildChange(index, e))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" onClick={() => removeChildForm(index)} className="btn btn-danger">Remove Child</button>
              </div>
            ))}
            <button type="button" onClick={addChildForm} className="btn btn-secondary">Add Child</button>
          </div>
        )}

        <button type="submit" className="btn btn-primary">Add Personnel</button>
      </form>
    </div>
  );
};

export default PersonnelForm;
