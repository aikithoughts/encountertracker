import React from 'react';
import MonsterTopStats from './MonsterTopStats';
import "./monster-stats.css";

export default function MonsterStatBlock({ monster, onClearData }) {

    return (
        <div className="monster-stat-block"> {/* Use the monster-stat-block class */}
            <div class="stat-block wide">
                <hr class="orange-border" />
                <div class="section-left">
                    <div class="creature-heading">
                        <h1>{monster.name}</h1>
                        <h2>{monster.size} {monster.type}, {monster.alignment}</h2>
                    </div> {/* creature heading */}
                    <svg height="5" width="100%" class="tapered-rule">
                        <polyline points="0,0 400,2.5 0,5"></polyline>
                    </svg>
                    <MonsterTopStats monster={monster}/>
                </div>
            </div>
        </div>
    )
}