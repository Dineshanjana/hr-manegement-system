import React, { useState } from 'react';
import axios from 'axios';
import './AdditionalColumns.css'; // Import the CSS file for styling

const AdditionalColumns = () => {
    const [columnName, setColumnName] = useState('');
    const [dataType, setDataType] = useState('');
    const [tableName, setTableName] = useState('');
    const [columns, setColumns] = useState([]);
    const [values, setValues] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            columnName,
            dataType
        };

        let endpoint = '';
        switch (tableName) {
            case 'AdditionalPersonnel':
                endpoint = '/additional/add';
                break;
            case 'AdditionalWife':
                endpoint = '/additional/wife';
                break;
            case 'AdditionalChild':
                endpoint = '/additional/child';
                break;
            default:
                console.error('Invalid table name');
                return;
        }

        try {
            const response = await axios.post(endpoint, data);
            alert(response.data.message);
            setColumns([...columns, { columnName, dataType }]);
            setColumnName('');
            setDataType('');
        } catch (error) {
            console.error('There was an error adding the column:', error);
            alert('Error adding column');
        }
    };

    const handleValueSubmit = async (e) => {
        e.preventDefault();

        let endpoint = '';
        switch (tableName) {
            case 'AdditionalPersonnel':
                endpoint = '/additional/insert';
                break;
            case 'AdditionalWife':
                endpoint = '/additional/insertwife';
                break;
            case 'AdditionalChild':
                endpoint = '/additional/insertchild';
                break;
            default:
                console.error('Invalid table name');
                return;
        }

        try {
            for (const [column, value] of Object.entries(values)) {
                const data = {
                    columnName: column,
                    value: value
                };
                const response = await axios.post(endpoint, data);
                alert(response.data.message);
            }
            setColumns([]);
            setValues({});
            setTableName('');
        } catch (error) {
            console.error('There was an error submitting the data:', error);
            alert('Error submitting data');
        }
    };

    const handleClear = () => {
        setColumns([]);
        setColumnName('');
        setDataType('');
        setTableName('');
    };

    return (
        <div className="container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        Column Name:
                        <input
                            type="text"
                            value={columnName}
                            onChange={(e) => setColumnName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Data Type:
                        <select value={dataType} onChange={(e) => setDataType(e.target.value)} required>
                            <option value="">Select Data Type</option>
                            <option value="VARCHAR(255)">VARCHAR(255)</option>
                            <option value="INT">INT</option>
                            <option value="DATE">DATE</option>
                            {/* Add more data types as needed */}
                        </select>
                    </label>
                    <label>
                        Table Name:
                        <select value={tableName} onChange={(e) => setTableName(e.target.value)} required>
                            <option value="">Select Table</option>
                            <option value="AdditionalPersonnel">AdditionalPersonnel</option>
                            <option value="AdditionalWife">AdditionalWife</option>
                            <option value="AdditionalChild">AdditionalChild</option>
                        </select>
                    </label>
                    <button type="submit">Create Column</button>
                    <button type="button" className="clear-button" onClick={handleClear}>Clear</button>
                </form>
            </div>
            {columns.length > 0 && (
                <div className="column-input-container">
                    <form onSubmit={handleValueSubmit}>
                        {columns.map((col, index) => (
                            <label key={index}>
                                {col.columnName}:
                                <input
                                    type="text"
                                    name={col.columnName}
                                    value={values[col.columnName] || ''}
                                    onChange={(e) => setValues({ ...values, [col.columnName]: e.target.value })}
                                    required
                                />
                            </label>
                        ))}
                        <button type="submit">Submit Values</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdditionalColumns;
