import React from 'react';
import EncounterTable from './EncounterTable';
import { COMBATANTS } from './data';
import Container from 'react-bootstrap/Container'; 

export default function EncounterBoard() {
  return (
    <Container style={{ padding: '20px' }}>
      <h1>Dave's Encounter Tracker</h1>
      <EncounterTable combatants={COMBATANTS} />
    </Container>
  );
}