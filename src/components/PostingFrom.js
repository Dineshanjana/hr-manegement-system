//

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdditionalColumns.css'; // Import the CSS file for styling

const AdditionalColumns = () => {
    const [columnName, setColumnName] = useState('');
    const [dataType, setDataType] = useState('');
    const [tableName, setTableName] = useState('');
    const [columns, setColumns] = useState([]);
    const [values, setValues] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [personnel, setPersonnel] = useState([]);
    const [selectedPersonnel, setSelectedPersonnel] = useState(null);

    useEffect(() => {
        if (searchTerm) {
            axios.get(`/personnelsearch?term=${searchTerm}`)
                .then(response => {
                    setPersonnel(response.data);
                })
                .catch(err => {
                    console.error('Error fetching searchTerm', err);
                });
        } else {
            setPersonnel([]);
        }
    }, [searchTerm]);

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
                    value: value,
                    personnelId: selectedPersonnel // Include selectedPersonnel id
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

    const handlePersonnelSelect = (personnel) => {
        setSelectedPersonnel(personnel.personnel_id);
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
                        <div className="form-group">
                            <label>Search Personnel:</label>
                            <input
                                type="text"
                                name="searchTerm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name or service number"
                            />
                        </div>
                        <div className="search-results">
                            {personnel.map((p) => (
                                <div key={p.personnel_id} className="personnel-item">
                                    <input
                                        type="radio"
                                        name="selectedPersonnel"
                                        id={`personnel_${p.personnel_id}`}
                                        value={p.personnel_id}
                                        onChange={() => handlePersonnelSelect(p)}
                                    />
                                    <label htmlFor={`personnel_${p.personnel_id}`}>
                                        <span>{p.first_name} {p.last_name}</span>
                                        <span className="service-number">({p.service_number})</span>
                                    </label>
                                </div>
                            ))}
                        </div>
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
