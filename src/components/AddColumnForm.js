import React, { useState } from 'react';
import axios from 'axios';
import './AddColumnForm.css'; 

const AddColumnForm = () => {
  const [columnName, setColumnName] = useState('');
  const [columnType, setColumnType] = useState('');

  const columnTypes = [
    'VARCHAR(255)',
    'INT',
    'TEXT',
    'DATE',
    'BOOLEAN',
    'FLOAT',
    'DOUBLE',
    'TIMESTAMP'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/personnel/add-column', { columnName, columnType });
      alert(`Column ${columnName} of type ${columnType} added successfully!`);
      setColumnName('');
      setColumnType('');
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  return (
    <form className="AddColumnForm" onSubmit={handleSubmit}>
      <div>
        <label>
          Column Name:
          <input
            type="text"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="column-types">
        <label>
          Column Type:
          <select value={columnType} onChange={(e) => setColumnType(e.target.value)} required>
            <option value="" disabled>Select a column type</option>
            {columnTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit">Add Column</button>
    </form>
  );
};

export default AddColumnForm;
