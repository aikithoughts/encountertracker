import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Combatant from './Combatant';
import AddCombatant from './AddCombatant';
import MonsterStatBlock from './MonsterStatBlock';


export default function EncounterTable({ combatants }) {
  const [combatantState, setCombatantState] = useState(combatants || []);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddCombatant, setShowAddCombatant] = useState(false);
  const [selectedCombatantId, setSelectedCombatantId] = useState(null);
  const [enemyData, setEnemyData] = useState(null);

  const handleDeletedCombatant = (combatantName) => {
    const updatedCombatants = combatantState.filter((combatant) => combatant.name !== combatantName);
    setCombatantState(updatedCombatants);
    console.log("Deleted combatant:", combatantName);
  };

  const handleClearData = () => {
    setEnemyData(null);
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleToggleShowAddCombatant = () => {
    setShowAddCombatant(!showAddCombatant);
  }


  const handleInputChange = (event, index, field) => {
    const { value } = event.target;
    setCombatantState((prevCombatants) => {
      const updatedCombatants = [...prevCombatants];
      updatedCombatants[index][field] = value;
      return updatedCombatants;
    });
  };

  const handleDataFromChild = (data) => {
    // Do something with the data received from the child component
    setEnemyData(data);
    // You can perform any further logic or state updates here
  };

  const processFormData = (formData) => {
    const newCombatant = {
      id: Date.now(), // Generate a unique ID (you can use a library like uuid for a more reliable unique ID)
      name: formData.name,
      initiative: parseInt(formData.initiative),
      type: formData.type,
      currenthp: parseInt(formData.hitpoints),
      totalhp: parseInt(formData.hitpoints),
    };

    setCombatantState((prevCombatants) => [...prevCombatants, newCombatant]);
    setShowAddCombatant(!showAddCombatant);
  };

  const sortedCombatants = combatantState.slice().sort((a, b) => b.initiative - a.initiative);

  const rows = sortedCombatants.map((combatant, index) => (
    <Combatant
      key={combatant.name}
      combatant={combatant}
      onDeleteCombatant={handleDeletedCombatant}
      isEditMode={isEditMode}
      onInputChange={(event, field) => handleInputChange(event, index, field)}
      isSelected={selectedCombatantId === combatant.id}
      onSelectCombatant={() => setSelectedCombatantId(combatant.id)}
      onDataFromChild={handleDataFromChild}
    />

  ));
  return (
    <Container>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Initiative</th>
              <th>Type</th>
              <th>Hit Points</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </Row>
      <Row className="justify-content-md-left">
        <Col md="auto">
          <Button variant="primary" onClick={handleToggleEditMode}>
            {isEditMode ? "Save" : "Edit Mode"}
          </Button> {' '}
          <Button variant="danger" onClick={handleToggleShowAddCombatant}>
            Add Combatant
          </Button>
        </Col>
      </Row>
      <Modal show={showAddCombatant} onHide={handleToggleShowAddCombatant}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Combatant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCombatant onSubmitForm={processFormData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggleShowAddCombatant}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="addCombatantForm">
            Add Combatant
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>

        {(enemyData !== null) ? <MonsterStatBlock monster={enemyData} onClearData={handleClearData} /> : ''}
      </Row>
    </Container>
  )
}