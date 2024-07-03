import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostingForm.css'; // Ensure this path is correct

const PostingForm = () => {
    const [personnel, setPersonnel] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({
        personnel_id: '',
        service_number: '',
        posted_to: '',
        start_date: '',
        end_date: '',
        no_of_days: '',
        prefix_date: '',
        suffix_date: '',
        remarks: '',
        reported_back: 'no',
        reporting_date: ''
    });

    useEffect(() => {
        if (searchTerm) {
            axios.get(`/personnelsearch?searchTerm=${searchTerm}`)
                .then(response => {
                    setPersonnel(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the personnel data!', error);
                });
        } else {
            setPersonnel([]);
        }
    }, [searchTerm]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));

        // Auto calculate end_date or no_of_days
        if (name === 'start_date' || name === 'no_of_days') {
            if (name === 'start_date' && value && form.no_of_days) {
                const endDate = new Date(value);
                endDate.setDate(endDate.getDate() + parseInt(form.no_of_days));
                setForm((prevForm) => ({
                    ...prevForm,
                    end_date: endDate.toISOString().split('T')[0]
                }));
            } else if (name === 'no_of_days' && form.start_date && value) {
                const endDate = new Date(form.start_date);
                endDate.setDate(endDate.getDate() + parseInt(value));
                setForm((prevForm) => ({
                    ...prevForm,
                    end_date: endDate.toISOString().split('T')[0]
                }));
            }
        } else if (name === 'start_date' || name === 'end_date') {
            if (name === 'start_date' && value && form.end_date) {
                const startDate = new Date(value);
                const endDate = new Date(form.end_date);
                const noOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                setForm((prevForm) => ({
                    ...prevForm,
                    no_of_days: noOfDays
                }));
            } else if (name === 'end_date' && form.start_date && value) {
                const startDate = new Date(form.start_date);
                const endDate = new Date(value);
                const noOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                setForm((prevForm) => ({
                    ...prevForm,
                    no_of_days: noOfDays
                }));
            }
        }
    };

    const handlePersonnelSelect = (selectedPersonnel) => {
        setForm((prevForm) => ({
            ...prevForm,
            personnel_id: selectedPersonnel.personnel_id,
            service_number: selectedPersonnel.service_number
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/posting', form)
            .then(response => {
                alert('Posting created successfully!');
            })
            .catch(error => {
                console.error('There was an error creating the posting!', error);
            });
    };

    return (
        <div className="posting-form-container">
            <form onSubmit={handleSubmit} className="posting-form">
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
                                checked={form.personnel_id === p.personnel_id}
                            />
                            <label htmlFor={`personnel_${p.personnel_id}`}>
                                <span>{p.first_name} {p.last_name}</span>
                                <span className="service-number">({p.service_number})</span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="form-group">
                    <label>Posted To:</label>
                    <input
                        type="text"
                        name="posted_to"
                        value={form.posted_to}
                        onChange={handleInputChange}
                        placeholder="Posted To"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="start_date"
                        value={form.start_date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="end_date"
                        value={form.end_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Number of Days:</label>
                    <input
                        type="number"
                        name="no_of_days"
                        value={form.no_of_days}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Prefix Date:</label>
                    <input
                        type="date"
                        name="prefix_date"
                        value={form.prefix_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Suffix Date:</label>
                    <input
                        type="date"
                        name="suffix_date"
                        value={form.suffix_date}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Remarks:</label>
                    <textarea
                        name="remarks"
                        value={form.remarks}
                        onChange={handleInputChange}
                        placeholder="Remarks"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Reported Back:</label>
                    <select
                        name="reported_back"
                        value={form.reported_back}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Reporting Date:</label>
                    <input
                        type="date"
                        name="reporting_date"
                        value={form.reporting_date}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PostingForm;
