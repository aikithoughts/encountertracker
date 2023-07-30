import React, { useState } from 'react';
import './App.css';

export default function EncounterBoard() {
  return (
    <div className="encounter-board">
      <h1>Dave's Encounter Tracker</h1>
      <EncounterTable combatants={COMBATANTS} />
    </div>
  )
}

function EncounterTable({ combatants }){
  const [combatantState, setCombatantState] = useState(combatants);

  const handleDeletedCombatant = (combatantName) => {
    const updatedCombatants = combatants.filter((combatant) => combatant.name !== combatantName);
    setCombatantState(updatedCombatants);
    console.log("Deleted combatant:", combatantName);
  }
  
  const sortedCombatants = combatantState.slice().sort((a, b) => b.initiative - a.initiative);
  
  const rows = sortedCombatants.map((combatant) => (
    <Combatant
      key={combatant.name}
      combatant={combatant}
      onDeleteCombatant={handleDeletedCombatant}
      />
  
  ));
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Initiative</th>
          <th>Type</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

function Combatant({ combatant, onDeleteCombatant }){

  const handleDeleteClick = () => {
    // Call the onDeleteCombatant function with the combatant's name
    onDeleteCombatant(combatant.name);
  };
  return(
      <tr id={combatant.name}>
        <td>{combatant.name}</td>
        <td>{combatant.initiative}</td>
        <td>{combatant.type}</td>
        <td>{combatant.number}</td>
        <td><button onClick={handleDeleteClick}>Delete</button></td>
      </tr>
  )
}

const COMBATANTS = [
  {name: "Dolor", initiative: 10, type: "player", number: 1},
  {name: "Gven", initiative: 15, type: "player", number: 1},
  {name: "Brindle", initiative: 7, type: "player", number: 1},
  {name: "Mond", initiative: 18, type: "player", number: 1},
  {name: "Gnoll", initiative: 3, type: "enemy", number: 3},
  {name: "Gnoll Pack Lord", initiative: 8, type: "enemy", number: 1},
  {name: "Lyra Swiftarrow", initiative: 21, type: "npc", number: 1}
];