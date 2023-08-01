import React from 'react';
import EncounterTable from './EncounterTable';
import { COMBATANTS } from './data';
import './App.css';

export default function EncounterBoard() {
  return (
    <div className="encounter-board">
      <h1>Dave's Encounter Tracker</h1>
      <EncounterTable combatants={COMBATANTS} />
    </div>
  )
}