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
  
  const sortedCombatants = combatants.slice().sort((a, b) => b.initiative - a.initiative);
  
  const rows = sortedCombatants.map((combatant) => renderCombatant(combatant));

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

function renderCombatant( combatant) {
  return(
    <Combatant
      key={combatant.name}
      name={combatant.name}
      initiative={combatant.initiative}
      type={combatant.type}
      number={combatant.number}
      />
  )
}

function Combatant({ name, initiative, type, number }){
  return(
      <tr id={name}>
        <td>{name}</td>
        <td>{initiative}</td>
        <td>{type}</td>
        <td>{number}</td>
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