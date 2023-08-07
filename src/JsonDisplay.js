import React from "react";
import "./monster-stats.css";

const JsonDisplay = ({ data, onClearData }) => {
  // const displayData = (data, indent) => {
  //   if (typeof data === "object") {
  //     return (
  //       <div className="section" style={{ marginLeft: indent }}>
  //         <ul>
  //           {Object.entries(data).map(([key, value]) => (
  //             <li key={key}>
  //               <span className="section-title">{key}:</span>{" "}
  //               <span className="section-data">
  //                 {typeof value === "object" ? displayData(value, indent + 20) : value}
  //               </span>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     );
  //   } else {
  //     return <span>{data}</span>;
  //   }
  // };

  return (
    <div className="monster-stat-block"> {/* Use the monster-stat-block class */}
      <div class="stat-block wide">
        <hr class="orange-border" />
        <div class="section-left">
          <div class="creature-heading">
            <h1>{data.name}</h1>
            <h2>{data.size} {data.type}, {data.alignment}</h2>
          </div> {/* creature heading */}
          <svg height="5" width="100%" class="tapered-rule">
            <polyline points="0,0 400,2.5 0,5"></polyline>
          </svg>
          <div class="top-stats">
            <div class="property-line first">
              <h4>Armor Class</h4>
              <p>{data.armor_class[0].value}</p> {/* TODO add type of armor */}
            </div> {/* property line */}
            <div class="property-line">
              <h4>Hit Points</h4>
              <p>33 (6d8 + 6)</p>
            </div> {/* property line */}
            <div class="property-line last">
              <h4>Speed</h4>
              <p>25ft.</p>
            </div> {/* property line */}
            <svg height="5" width="100%" class="tapered-rule">
              <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div class="abilities">
              <div class="ability-strength">
                <h4>STR</h4>
                <p>14 (+2)</p>
              </div> {/* ability strength */}
              <div class="ability-dexterity">
                <h4>DEX</h4>
                <p>11 (+0)</p>
              </div> {/* ability dexterity */}
              <div class="ability-constitution">
                <h4>CON</h4>
                <p>13 (+1)</p>
              </div> {/* ability constitution */}
              <div class="ability-intelligence">
                <h4>INT</h4>
                <p>1 (-5)</p>
              </div> {/* ability intelligence */}
              <div class="ability-wisdom">
                <h4>WIS</h4>
                <p>3 (-4)</p>
              </div> {/* ability wisdom */}
              <div class="ability-charisma">
                <h4>CHA</h4>
                <p>1 (-5)</p>
              </div> {/* ability charisma */}
            </div> {/* abilities */}
            <svg height="5" width="100%" class="tapered-rule">
              <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div class="property-line first">
              <h4>Damage Immunities</h4>
              <p>poison, psychic</p>
            </div> {/* property line */}
            <div class="property-line">
              <h4>Condition Immunities</h4>
              <p>blinded, charmed, deafened, exhaustion, frightened,
                petrified, poisoned</p>
            </div> {/* property line */}
            <div class="property-line">
              <h4>Senses</h4>
              <p>blindsight 60ft. (blind beyond this radius), passive Perception 6</p>
            </div> {/* property line */}
            <div class="property-line">
              <h4>Languages</h4>
              <p>&mdash;</p>
            </div> {/* property line */}
            <div class="property-line last">
              <h4>Challenge</h4>
              <p>1 (200 XP)</p>
            </div> {/* property line */}
          </div> {/* top stats */}
          <svg height="5" width="100%" class="tapered-rule">
            <polyline points="0,0 400,2.5 0,5"></polyline>
          </svg>
          <div class="property-block">
            <h4>Antimagic Suceptibility.</h4>
            <p>The armor is incapacitated while in the area of an <i>antimagic
              field</i>.  If targeted by <i>dispel magic</i>, the armor must succeed
              on a Constitution saving throw against the caster’s spell save DC or
              fall unconscious for 1 minute.</p>
          </div> {/* property block */}
          <div class="property-block">
            <h4>False Appearance.</h4>
            <p>While the armor remains motionless, it is indistinguishable from a
              normal suit of armor.</p>
          </div> {/* property block */}
        </div> {/* section left */}
        <div class="section-right">
          <div class="actions">
            <h3>Actions</h3>
            <div class="property-block">
              <h4>Multiattack.</h4>
              <p>The armor makes two melee attacks.</p>
            </div> {/* property block */}
            <div class="property-block">
              <h4>Slam.</h4>
              <p><i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target.
                <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.</p>
            </div> {/* property block */}
          </div> {/* actions */}
          <div class="actions">
            <h3>Legendary Actions</h3>
            <div class="property-block">
              <h4>Multiattack.</h4>
              <p>The armor makes two melee attacks.</p>
            </div> {/* property block */}
            <div class="property-block">
              <h4>Slam.</h4>
              <p><i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target.
                <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.</p>
            </div> {/* property block */}
          </div> {/* actions */}
        </div> {/* section right */}
        <hr class="orange-border bottom" />
      </div> {/* stat block */}

    </div>
  );
};

export default JsonDisplay;