import React from 'react';
import { Form } from 'react-bootstrap';

const FilterDropdown = ({ options, onSelect }) => {
    return (
        <Form.Select onChange={(e) => onSelect(e.target.value)}>
            <option value="">All Departments</option>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </Form.Select>
    );
};

export default FilterDropdown;
