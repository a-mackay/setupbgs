import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

function App() {
    // for (let i = 0; i < 100; i++) {
    //     console.log(randomIntInclusive(0, 2));
    // }
    return (
        <div className="App">
            <h1>Welcome to React Router!</h1>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/vinhos" element={<Vinhos />} />
            </Routes>
        </div>
    );
}

function Index() {
    return <div>
        {BG_NAMES.map(name => <IndexItem key={name} name={name} />)}
    </div>
}

interface IndexItemProps {
    name: string;
}

function IndexItem({name}: IndexItemProps) {
    return <Link to={bgNameToSlug(name)}>{name}</Link>
}

function Vinhos() {
    const [useExpansionRegions, setUseExpansionRegions] = useState(false);
    const [playerCount, setPlayerCount] = useState(3);
    const [removedRegions, setRemovedRegions] = useState<number[] | null>(null);
    const baseRegions = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const allRegions = useExpansionRegions ? baseRegions.concat([10, 11]) : baseRegions

    const generateRemovedRegions = () => {
        let regionCount;
        if (playerCount === 2) {
            regionCount = 7;
        } else if (playerCount === 3) {
            regionCount = 8;
        } else if (playerCount === 4) {
            regionCount = 9;
        } else {
            throw new Error(`Invalid player count ${playerCount}`);
        };

        let remainingRegions = allRegions;
        const removedRegions: number[] = [];
        while (remainingRegions.length > regionCount) {
            const result = removeRandomItemFromArray(remainingRegions);
            remainingRegions = result.remainingItems
            removedRegions.push(result.removedItem);
        }

        removedRegions.sort((a, b) => a - b);

        return removedRegions;
    }

    function RemovedRegionsOutput(removedRegions: number[] | null) {
        if (removedRegions === null) {
            return null;
        }

        if (removedRegions.length === 0) {
            return <div>No regions need to be removed.</div>
        } else {
            return <div>
                <div>Remove the following regions:</div>
                {removedRegions.map(num => <div key={num}>{num}</div>)}
            </div>
        }
    }

    return <div>
        <h2>Vinhos</h2>
        <Input>
            <Checkbox
                isChecked={useExpansionRegions}
                onChange={() => setUseExpansionRegions(bool => !bool)}
            />
            <div>Use expansion regions?</div>
        </Input>
        <Input>
            <Dropdown
                selectedValue={playerCount}
                values={[2, 3, 4]}
                serializeValue={num => num.toString()}
                deserializeValue={s => parseInt(s)}
                valueToDisplayName={num => num.toString()}
                onChange={num => setPlayerCount(num)}
            />
            <div>Players</div>
        </Input>
        <Input>
            <Button name="Generate" onClick={() => setRemovedRegions(generateRemovedRegions())}/>
        </Input>
        <Output>
            {RemovedRegionsOutput(removedRegions)}
        </Output>
    </div>
}

interface InputProps {
    children: React.ReactNode | null | undefined;
}

function Input({children}: InputProps) {
    return <div className="input">
        {children}
    </div>
}

interface OutputProps {
    children: React.ReactNode | null | undefined;
}

function Output({children}: InputProps) {
    return <div className="input">
        {children}
    </div>
}

interface DropdownProps<T> {
    selectedValue: T;
    values: T[];
    serializeValue: (value: T) => string;
    deserializeValue: (value: string) => T;
    valueToDisplayName: (value: T) => string;
    onChange: (value: T) => void;
}

function Dropdown<T>({selectedValue, values, serializeValue, deserializeValue, valueToDisplayName, onChange}: DropdownProps<T>) {
    interface Item {
        serialized: string;
        name: string;
    }

    const onChangeWrapper = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = deserializeValue(event.target.value)
        onChange(value)
    }

    const items: Item[] = values.map(value => {
        return {
            serialized: serializeValue(value),
            name: valueToDisplayName(value),
        }
    })

    return <select className="dropdown" value={serializeValue(selectedValue)} onChange={onChangeWrapper}>
        {items.map(item => <option value={item.serialized} key={item.serialized}>{item.name}</option>)}
    </select>
}

interface CheckboxProps {
    isChecked: boolean;
    onChange: () => void;
}

function Checkbox({isChecked, onChange}: CheckboxProps) {
    return <input
        className="checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
    />
}

interface ButtonProps {
    name: string;
    onClick: () => void;
}

function Button({name, onClick}: ButtonProps) {
    return <button className="button" onClick={onClick}>{name}</button>
}

export default App;

const BG_NAMES: string[] = [
    "Vinhos",
]

function bgNameToSlug(name: string): string {
    return name.toLowerCase().replace(/\s/g, "");
}

interface RemoveRandomItemResult<T> {
    remainingItems: T[];
    removedItem: T;
}

function removeRandomItemFromArray<T>(items: T[]): RemoveRandomItemResult<T> {
    if (items.length === 0) {
        throw new Error("Cannot remove an item from an empty array");
    } else {
        const indexToRemove = randomIntInclusive(0, items.length - 1);
        const remainingItems = items.filter((_, index) => index !== indexToRemove);
        const removedItem = items.filter((_, index) => index === indexToRemove)[0];

        console.assert(remainingItems.length === items.length - 1);
        console.assert(removedItem !== null);
        console.assert(removedItem !== undefined);

        return {
            remainingItems,
            removedItem,
        }
    }
}

function randomIntInclusive(min: number, max: number): number {
    const min2 = Math.ceil(min); // min2 is inclusive
    const max2 = Math.floor(max) + 1; // Add 1 because max2 is exclusive
    return Math.floor((Math.random() * (max2 - min2)) + min2);
}