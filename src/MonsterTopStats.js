import React from 'react';
import "./monster-stats.css";

export default function MonsterTopStats({ monster }) {

    const { 
        armor_class: armorClass, 
        hit_points: hitPoints,
        hit_dice: hitDice,
        speed,
        senses,
        languages,
        challenge_rating: challengeRating,
        xp } = monster;
    let armorNames = [];
    let immunities = [];
    let conditionImmunities = [];

    if (armorClass.armor) {
        armorNames = armorNames.concat(armorClass.armor.map((armor) => armor.name));
    }

    if (monster.damage_immunities) {
        immunities = immunities.concat(monster.damage_immunities.map((immunity) => immunity));
    }

    if (monster.condition_immunities) {
        conditionImmunities = conditionImmunities.concat(monster.condition_immunities.map((immunity) => immunity));
    }

    const formattedSenses = Object.entries(senses).map(([sense, value]) => {
        if (typeof value === "number") {
          return `${sense.replace("_", " ")}: ${value}`;
        } else {
          return `${sense.replace("_", " ")} (${value})`;
        }
      });
      
      const sensesResult = formattedSenses.join(", ");

    return (
        <div class="top-stats">
            <div class="property-line first">
                <h4>Armor Class</h4>
                <p>{armorClass.value} ({armorNames})</p>
            </div> {/* property line */}
            <div class="property-line">
                <h4>Hit Points</h4>
                <p>{hitPoints} ({hitDice} + 6)</p>
            </div> {/* property line */}
            <div class="property-line last">
                <h4>Speed</h4>
                <p>{speed.walk} (walk)</p> {/* TODO Add other movement types */}
            </div> {/* property line */}
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div class="abilities">
                <div class="ability-strength">
                    <h4>STR</h4>
                    <p>{monster.strength}</p>
                </div> {/* ability strength */}
                <div class="ability-dexterity">
                    <h4>DEX</h4>
                    <p>{monster.dexterity}</p>
                </div> {/* ability dexterity */}
                <div class="ability-constitution">
                    <h4>CON</h4>
                    <p>{monster.constitution}</p>
                </div> {/* ability constitution */}
                <div class="ability-intelligence">
                    <h4>INT</h4>
                    <p>{monster.intelligence}</p>
                </div> {/* ability intelligence */}
                <div class="ability-wisdom">
                    <h4>WIS</h4>
                    <p>{monster.wisdom}</p>
                </div> {/* ability wisdom */}
                <div class="ability-charisma">
                    <h4>CHA</h4>
                    <p>{monster.charisma}</p>
                </div> {/* ability charisma */}
            </div> {/* abilities */}
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div class="property-line first">
                <h4>Damage Immunities</h4>
                <p>{immunities}</p>
            </div> {/* property line */}
            <div class="property-line">
                <h4>Condition Immunities</h4>
                <p>{conditionImmunities}</p>
            </div> {/* property line */}
            <div class="property-line">
                <h4>Senses</h4>
                <p>{sensesResult}</p>
            </div> {/* property line */}
            <div class="property-line">
                <h4>Languages</h4>
                <p>{languages}</p>
            </div> {/* property line */}
            <div class="property-line last">
                <h4>Challenge</h4>
                <p>{challengeRating} ({xp} XP)</p>
            </div> {/* property line */}
        </div>
    )
}