import React from 'react';
import Container from 'react-bootstrap/Container';
import EncounterTable from './EncounterTable';
import { COMBATANTS } from './data';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./monster-stats.css";

export default function EncounterBoard() {
  return (
      <Container className="encounter-board">
        <h1>Roll for Anvil: Encounter Tracker</h1>
        <EncounterTable combatants={COMBATANTS} />
      </Container>
  )
}