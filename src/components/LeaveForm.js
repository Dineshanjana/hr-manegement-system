import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeaveForm.css'; 

const LeaveForm = () => {
    const [personnel, setPersonnel] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({
        personnel_id: '',
        service_number: '',
        start_date: '',
        end_date: '',
        prefix_on: '',
        suffix_on: '',
        no_of_days: '',
        remarks: '',
        leave_type: '',
        status: 'pending',
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
        setForm({
            ...form,
            [name]: value
        });

        if (name === 'start_date' && form.no_of_days) {
            const endDate = new Date(value);
            endDate.setDate(endDate.getDate() + parseInt(form.no_of_days));
            setForm({
                ...form,
                end_date: endDate.toISOString().split('T')[0]
            });
        } else if (name === 'no_of_days' && form.start_date) {
            const endDate = new Date(form.start_date);
            endDate.setDate(endDate.getDate() + parseInt(value));
            setForm({
                ...form,
                end_date: endDate.toISOString().split('T')[0],
                no_of_days: value
            });
        }
    };

    const handlePersonnelSelect = (selectedPersonnel) => {
        setForm({
            ...form,
            personnel_id: selectedPersonnel.personnel_id,
            service_number: selectedPersonnel.service_number
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/leave', form)
            .then(response => {
                alert('Leave request created successfully!');
            })
            .catch(error => {
                console.error('There was an error creating the leave request!', error);
            });
    };

    return (
        <div className="leave-form-container">
            <form onSubmit={handleSubmit} className="leave-form">
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
                    <label>Prefix On:</label>
                    <input
                        type="date"
                        name="prefix_on"
                        value={form.prefix_on}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Suffix On:</label>
                    <input
                        type="date"
                        name="suffix_on"
                        value={form.suffix_on}
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
                    <label>Leave Type:</label>
                    <select name="leave_type" value={form.leave_type} onChange={handleInputChange}>
                        <option value="">Select Leave Type</option>
                        <option value="CL1">CL1</option>
                        <option value="CL2">CL2</option>
                        <option value="CL3">CL3</option>
                        <option value="PAL">PAL</option>
                        <option value="AL">AL</option>
                        <option value="BAL">BAL</option>
                        <option value="AAL">AAL</option>
                        <option value="SICK LEAVE">SICK LEAVE</option>
                        <option value="FUR LEAVE">FUR LEAVE</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <select name="status" value={form.status} onChange={handleInputChange}>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="absent">Absent</option>
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

export default LeaveForm;
