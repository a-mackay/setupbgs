import { useState } from "react";
import { removeRandomItemFromArray } from "../Random";
import { Button, Checkbox, Dropdown, Input, Output } from "../Elements";

export function Vinhos() {
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