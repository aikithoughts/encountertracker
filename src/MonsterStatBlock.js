import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
// import "./monster-stats.css";

export default function MonsterStatBlock({ monster, onClearData }) {

    const {
        armor_class: armorClass,
        hit_points: hitPoints,
        speed,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        proficiencies,
        special_abilities: specialAbilities,
        actions
    } = monster;

    const speedsResult = Object.entries(speed)
        .map(([speed, value]) => `${speed} (${value})`)
        .join(", ");

    const skillProficiencies = proficiencies
        .filter((proficiency) => proficiency.proficiency.index.includes("skill"))
        .map((skillProficiency) => {
            const nameParts = skillProficiency.proficiency.name.split(": ");
            const skillProficiencyName = nameParts[1].toUpperCase();
            return `${skillProficiencyName}: ${skillProficiency.value}`;
        });

    const skillProficienciesOutput = skillProficiencies.length
        ? skillProficiencies.join("; ")
        : "Not available";


    const renderSpecialAbilities = () => {
        if (specialAbilities.length === 0) {
            return <div>Not available</div>;
        }

        return specialAbilities.map((specialAbility, index) => (
            <tr id={index}>
                <td>{specialAbility.name}</td>
                <td>{specialAbility.desc}</td>
                <td>{specialAbility.usage && `${specialAbility.usage.times} ${specialAbility.usage.type}`}</td>
            </tr>
        ));
    };

    const renderActions = () => {
        if (actions.length === 0) {
            return <div>Not available</div>;
        }

        return actions.map((action, index) => (
            <tr id={index}>
                <td>{action.name}</td>
                <td>{action.desc}</td>
            </tr>
        ));
    };

    return (
        <Container>
            <h3>Monster Stats</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name: </td>
                        <td>{monster.name}</td>
                    </tr>
                    <tr>
                        <td>Size: </td>
                        <td>{monster.size}</td>
                    </tr>
                    <tr>
                        <td>Alignment: </td>
                        <td>{monster.alignment}</td>
                    </tr>
                    <tr>
                        <td>Armor Class:</td>
                        <td>{armorClass.map((armor) => `${armor.value} (${armor.type})`).join(", ")}</td>
                    </tr>
                    <tr>
                        <td>Hit Points: </td>
                        <td>{hitPoints}</td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>{speedsResult}</td>
                    </tr>
                </tbody>
            </Table>
            <h3>Attributes</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            STR
                        </th>
                        <th>
                            DEX
                        </th>
                        <th>
                            CON
                        </th>
                        <th>
                            INT
                        </th>
                        <th>
                            wIS
                        </th>
                        <th>
                            CHA
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {strength}
                        </td>
                        <td>
                            {dexterity}
                        </td>
                        <td>
                            {constitution}
                        </td>
                        <td>
                            {intelligence}
                        </td>
                        <td>
                            {wisdom}
                        </td>
                        <td>
                            {charisma}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <h3>Skills</h3>
            <div>{skillProficienciesOutput}</div>
            <h3>Special Abilities</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Other Information</th>
                    </tr>
                </thead>
                <tbody>
                    {renderSpecialAbilities()}
                </tbody>
            </Table>
            <h3>Actions</h3>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                {renderActions()}
                </tbody>
            </Table>
        </Container>
    )
}