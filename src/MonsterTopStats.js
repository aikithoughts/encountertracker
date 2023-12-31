import React from 'react';
// import SpellcastingComponent from './Spellcasting';
// import "./monster-stats.css";

export default function MonsterTopStats({ monster }) {

    const { 
        armor_class: armorClass, 
        hit_points: hitPoints,
        // hit_dice: hitDice,
        hit_points_roll: hpRoll,
        speed,
        senses,
        languages,
        challenge_rating: challengeRating,
        // xp,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        damage_immunities: damageImmunities,
        condition_immunities: conditionImmunities,
        proficiencies,
        special_abilities: specialAbilities } = monster;

    let armorNames = [];
    let immunities = [];
    let conditions = [];
   // let speeds = [];

    const getPropValue = (obj, key) =>
        key.split('.').reduce((o, x) =>
            o == undefined ? o : o[x]
            , obj)

    const xp = getPropValue(monster, "xp");

    if (armorClass[0].armor) { /* TODO Figure out how often there are multiple entries in this array */
        armorNames = armorClass[0].armor.map((armor) => armor.name);
        armorNames = armorNames.join(', ')
    }

    if (damageImmunities && damageImmunities.length > 0) {
        immunities = immunities.concat(monster.damage_immunities.map((immunity) => immunity));
    } else {
        immunities.push('None')
    }

    if (conditionImmunities && conditionImmunities.length > 0) {
        conditions = conditionImmunities.concat(monster.condition_immunities.map((immunity) => immunity));
    }

    const formattedSenses = Object.entries(senses).map(([sense, value]) => {
        if (typeof value === "number") {
          return `${sense.replace("_", " ")}: ${value}`;
        } else {
          return `${sense.replace("_", " ")} (${value})`;
        }
      });
      
    const sensesResult = formattedSenses.join(", ");

    const formattedSpeeds = Object.entries(speed).map(([speed, value]) => {
        return `${speed} (${value})`
    })

    const speedsResult = formattedSpeeds.join (", ");

    // Filter the 'proficiencies' array to get only saving throws
    const savingThrows = proficiencies.filter((proficiency) =>
        proficiency.proficiency.index.includes("saving-throw")
    );

    let savingThrowsOutput;
    if (savingThrows.length === 0) {
        savingThrowsOutput = "Not available";
    } else {
        // Create an object to hold the saving throw names and values
        const savingThrowMap = {};

        // Populate the saving throw names and values in the object
        savingThrows.forEach((savingThrow) => {
            const nameParts = savingThrow.proficiency.name.split(": ");
            const savingThrowName = nameParts[1].toUpperCase();
            savingThrowMap[savingThrowName] = savingThrow.value;
        });

        // Build the output string
        savingThrowsOutput = Object.entries(savingThrowMap)
            .map(([name, value]) => `${name}: ${value}`)
            .join("; ");
    }

    // Filter the `proficiencies' array to get skill-related proficiencies.
    const skillProficiencies = proficiencies.filter((proficiency) =>
      proficiency.proficiency.index.includes("skill")
    );

    let skillProficienciesOutput;
    if (skillProficiencies.length === 0 ) {
        skillProficienciesOutput = "Not available";
    } else {
        const skillProficiencyMap = {};

        skillProficiencies.forEach((skillProficiency) => {
            const nameParts = skillProficiency.proficiency.name.split(": ");
            const skillProficiencyName = nameParts[1].toUpperCase();
            skillProficiencyMap[skillProficiencyName] = skillProficiency.value;
        });

        skillProficienciesOutput = Object.entries(skillProficiencyMap)
           .map(([name, value]) => `${name}: ${value}`)
           .join("; ");
    }

    let specialAbilitiesOutput;
    if (specialAbilities.length === 0) {
        specialAbilitiesOutput = "Not available";
    } else {
        specialAbilitiesOutput = specialAbilities.map((specialAbility, index) => (
            <div className="property-line">
                <h4>{specialAbility.name}</h4>
                <p>
                  {specialAbility.desc}
                  {specialAbility.usage && (`${specialAbility.usage.times} ${specialAbility.usage.type}`)}
                </p>
            </div>
        ));
    }
    
    return (
        <div className="top-stats">
            <div className="property-line first">
                <h4>Armor Class</h4>
                <p>{armorClass[0].value} {armorNames.length > 0 && ` (${armorNames})`}</p>
            </div> {/* property line */}
            <div className="property-line">
                <h4>Hit Points</h4>
                <p>{hitPoints} ({hpRoll})</p>
            </div> {/* property line */}
            <div className="property-line last">
                <h4>Speed</h4>
                <p>{speedsResult}</p> {/* TODO Add other movement types */}
            </div> {/* property line */}
            <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div className="abilities">
                <div className="ability-strength">
                    <h4>STR</h4>
                    <p>{strength}</p>
                </div> {/* ability strength */}
                <div className="ability-dexterity">
                    <h4>DEX</h4>
                    <p>{dexterity}</p>
                </div> {/* ability dexterity */}
                <div className="ability-constitution">
                    <h4>CON</h4>
                    <p>{constitution}</p>
                </div> {/* ability constitution */}
                <div className="ability-intelligence">
                    <h4>INT</h4>
                    <p>{intelligence}</p>
                </div> {/* ability intelligence */}
                <div className="ability-wisdom">
                    <h4>WIS</h4>
                    <p>{wisdom}</p>
                </div> {/* ability wisdom */}
                <div className="ability-charisma">
                    <h4>CHA</h4>
                    <p>{charisma}</p>
                </div> {/* ability charisma */}
            </div> {/* abilities */}
            <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div className="property-line first">
                <h4>Saving throws</h4>
                <p>{savingThrowsOutput}</p>
            </div> {/* property line */}
            <div className="property-line">
                <h4>Proficiences</h4>
                <p>{skillProficienciesOutput}</p>
            </div> {/* property line */}
            <div className="property-line">
                <h4>Damage Immunities</h4>
                <p>{immunities}</p>
            </div> {/* property line */}
            <div className="property-line">
                <h4>Condition Immunities</h4>
                <p>{conditions}</p>
            </div> {/* property line */}
            <div className="property-line">
                <h4>Senses</h4>
                <p>{sensesResult}</p>
            </div> {/* property line */}
            <div className="property-line">
                <h4>Languages</h4>
                <p>{languages}</p>
            </div> {/* property line */}
            <div className="property-line last">
                <h4>Challenge</h4>
                <p>{challengeRating} ({xp} XP)</p>
            </div> {/* property line */}
            <div className="property-block">
                {specialAbilitiesOutput}
            </div>
            {/* {specialAbilities.Spellcasting && <SpellcastingComponent monster={monster}/>} */}
        </div>
    )
}