//src\components\AdditionalColumns.js (create new file in the componets)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdditionalColumns.css'; // Import the CSS file for styling

const AdditionalColumns = () => {
    const [columnName, setColumnName] = useState('');
    const [dataType, setDataType] = useState('');
    const [tableName, setTableName] = useState('');
    const [columns, setColumns] = useState([]);


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
                            <option value="DATETIME">DATETIME</option>
                            <option value="TIMESTAMP">TIMESTAMP</option>
                            <option value="FLOAT">FLOAT</option>
                            <option value="DOUBLE">DOUBLE</option>
                            <option value="DECIMAL">DECIMAL</option>
                            <option value="TEXT">TEXT</option>
                            <option value="BOOLEAN">BOOLEAN</option>
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
        </div>
    );
};

export default AdditionalColumns;
