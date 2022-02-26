// Contains UI elements which are shared throughout the app.

interface ColumnProps {
    children: React.ReactNode | null | undefined;
}

export function Column({children}: ColumnProps) {
    return <div className="column">
        {children}
    </div>
}

interface InputProps {
    children: React.ReactNode | null | undefined;
}

export function Input({children}: InputProps) {
    return <div className="input">
        {children}
    </div>
}

interface OutputProps {
    children: React.ReactNode | null | undefined;
}

export function Output({children}: OutputProps) {
    return <div className="input">
        {children}
    </div>
}

interface PlayerCountDropdownProps {
    selectedPlayerCount: number;
    playerCounts: number[];
    onChange: (playerCount: number) => void;
}

export function PlayerCountDropdown({selectedPlayerCount, playerCounts, onChange}: PlayerCountDropdownProps) {
    return <LabeledDropdown
        selectedValue={selectedPlayerCount}
        values={playerCounts}
        serializeValue={(n: number) => n.toString()}
        deserializeValue={(value: string) => parseInt(value)}
        valueToDisplayName={(n: number) => n.toString()}
        onChange={onChange}
        label={"Players"}
    />
}

interface LabeledDropdownProps<T> {
    selectedValue: T;
    values: T[];
    serializeValue: (value: T) => string;
    deserializeValue: (value: string) => T;
    valueToDisplayName: (value: T) => string;
    onChange: (value: T) => void;
    label: string;
}

export function LabeledDropdown<T>({selectedValue, values, serializeValue, deserializeValue, valueToDisplayName, onChange, label}: LabeledDropdownProps<T>) {
    return <div className="labeled-dropdown">
        <Dropdown
            selectedValue={selectedValue}
            values={values}
            serializeValue={serializeValue}
            deserializeValue={deserializeValue}
            valueToDisplayName={valueToDisplayName}
            onChange={onChange}
        />
        <div>{label}</div>
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

export function Dropdown<T>({selectedValue, values, serializeValue, deserializeValue, valueToDisplayName, onChange}: DropdownProps<T>) {
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

interface LabeledCheckboxProps {
    isChecked: boolean;
    onChange: () => void;
    label: string;
}

export function LabeledCheckbox({isChecked, onChange, label}: LabeledCheckboxProps) {
    return <div className="labeled-checkbox">
        <Checkbox
            isChecked={isChecked}
            onChange={onChange}
        />
        <div>{label}</div>
    </div>
}

interface CheckboxProps {
    isChecked: boolean;
    onChange: () => void;
}

export function Checkbox({isChecked, onChange}: CheckboxProps) {
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

export function Button({name, onClick}: ButtonProps) {
    return <button className="button" onClick={onClick}>{name}</button>
}