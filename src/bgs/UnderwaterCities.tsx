import { useState } from "react";
import { Dropdown, Input, LabeledCheckbox, Output, PlayerCountDropdown } from "../Elements";

export function UnderwaterCities() {
    const [variant, setVariant] = useState(VARIANTS[0]);
    const [useQuickStart, setUseQuickStart] = useState(true);
    const [playerCount, setPlayerCount] = useState(3);

    const rules = rulesFor(variant, useQuickStart, playerCount);

    return <div>
        <h2>Underwater Cities</h2>
        <Input>
            <Dropdown
                selectedValue={variant}
                serializeValue={variant => variant.name}
                deserializeValue={value => VARIANTS.find(v => v.name == value) as Variant}
                values={VARIANTS}
                valueToDisplayName={variant => variant.name}
                onChange={variant => setVariant(variant)}
            />
        </Input>
        <Input>
            <LabeledCheckbox
                onChange={() => setUseQuickStart(bool => !bool)}
                isChecked={useQuickStart}
                label={"Use Quick Start rules?"}
            />
        </Input>
        <Input>
            <PlayerCountDropdown
                selectedPlayerCount={playerCount}
                playerCounts={[1, 2, 3, 4]}
                onChange={num => setPlayerCount(num)}
            />
        </Input>
        <Output>
            <div>Setup</div>
            <ol>
                {rules.setup.map(rule => <li>{rule}</li>)}
            </ol>
            <div>New Rules</div>
            <ol>
                {rules.rules.map(rule => <li>{rule}</li>)}
            </ol>
        </Output>
    </div>
}

const VARIANTS: Variant[] = [
    variant(1, "Standard"),
    variant(2, "Metropolis Race"),
    variant(3, "Metropolis Choice"),
    variant(4, "Museum"),
]

function variant(id: number, name: string): Variant {
    return {
        id,
        name,
    }
}

interface Variant {
    id: number;
    name: string;
}

interface Components {
    useActionCloningTile: boolean;
    symbioticCities: number;
}

function componentsFor(playerCount: number): Components {
    let components;
    if (playerCount === 1) {
        components = {
            useActionCloningTile: false,
            symbioticCities: 7,
        }
    } else if (playerCount === 2) {
        components = {
            useActionCloningTile: false,
            symbioticCities: 7,
        }
    } else if (playerCount === 3) {
        components = {
            useActionCloningTile: false,
            symbioticCities: 10,
        }
    } else if (playerCount === 4) {
        components = {
            useActionCloningTile: true,
            symbioticCities: 13,
        }
    } else {
        throw Error(`Invalid player count '${playerCount}'`);
    }
    return components;
}

interface Rules {
    setup: string[];
    rules: string[];
}

function rulesFor(variant: Variant, useQuickStart: boolean, playerCount: number): Rules {
    const setup = []
    const rules = [];
    const name = variant.name;
    if (name === "Metropolis Race") {
        setup.push("Use boards 1-4, 5-8 or 9-12.");
        setup.push(`Randomly place ${playerCount + 1} blue metropolises on the table.`);
        setup.push(`Randomly place ${playerCount + 1} green metropolises on the table.`);
        rules.push("When you connect to your first metropolis, pick from the available blue metropolises.");
        rules.push("When you connect to your second metropolis, pick from the available green metropolises.");
    } else if (name === "Metropolis Choice") {
        setup.push("Use boards 13-16.");
        setup.push("Each player randomly draws the number and color of metropolises indicated on their board.");
        rules.push("Before you take your first turn, choose one metropolis for each space.");
    } else if (name === "Museum") {
        setup.push("Use boards 9-12.");
        setup.push("Take 5 discovery tiles in your color.");
        setup.push("See book for rest // TODO :)");
    }

    if (playerCount === 1) {
        setup.push("Remove the 7x cities orange metropolis tile.");
    }
    const components = componentsFor(playerCount);
    if (components.useActionCloningTile) {
        setup.push("Use the action cloning tile.");
    }
    setup.push(`Use ${components.symbioticCities} symbiotic cities.`);
    if (useQuickStart) {
        setup.push("Deal 2 new personal assistants to each player.");
        rules.push("Pick one personal assistant to keep at the beginning of your first turn.");
        setup.push(`Randomly place ${playerCount + 1} starting resource tiles on the table.`);
        setup.push("After starting hands are dealt, in reverse player order, players choose a starting resource tile.");
        setup.push("Skip the first round of the game.");
    } else {
        setup.push(`Each player starts with ${DEFAULT_STARTING_RESOURCES}.`);
    }

    return {
        setup,
        rules,
    };
}

const DEFAULT_STARTING_RESOURCES = "1 kelp, 1 science, 1 steelplast and 2 credits"