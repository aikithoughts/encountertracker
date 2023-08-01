import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AddCombatant({ onSubmitForm }) {
    const [formData, setFormData] = useState({
      name: '',
      initiative: 0,
      type: '',
      hitpoints: 0
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmitForm(formData); // Call the callback function to pass the form data to the parent component
      setFormData({  // Reset the form after submission
        name: '',
        initiative: 0,
        type: '',
        hitpoints: 0
      });
    };
  
    return (
        <Form id="addCombatantForm" onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="initiative">
          <Form.Label>Initiative:</Form.Label>
          <Form.Control
            type="number"
            name="initiative"
            value={formData.initiative}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Type:</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="hitPoints">
          <Form.Label>Hit Points:</Form.Label>
          <Form.Control
            type="number"
            name="hitpoints"
            value={formData.hitpoints}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Add Combatant</Button>
      </Form>
    );
  }