import React from 'react';
import EncounterTable from './EncounterTable';
import { COMBATANTS } from './data'; // Assuming your data is in a separate file

export default function EncounterBoard() {
  return (
    <div className="encounter-board">
      <h1>Dave's Encounter Tracker</h1>
      <EncounterTable combatants={COMBATANTS} />
    </div>
  );
}