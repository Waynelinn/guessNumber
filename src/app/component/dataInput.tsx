import React, { useState, useContext } from "react";
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import "./input.css"
import { DataContext } from "../page";

interface Props {
    label: string;
    value: number;
    onValueChange: (newValue: number) => void;
    className?: string;
}

const DataInput: React.FC<Props> = ({ label, value, onValueChange, className }) => {
    // const [value, setValue] = useState<number>(label == 'Points' ? 100 : 1);
    const contextData = useContext(DataContext)
    const handleIncrease = () => {
        if (label == "Points") {
            // setValue(value + 25)
            onValueChange(value + 25)
        } else {
            // setValue((prevValue) => Math.min(prevValue + 0.25, 10));
            onValueChange(Math.min(value + 0.25, 10))
        }
    }

    const handleReduce = () => {
        if (label == "Points") {
            // setValue((prevValue) => Math.max(prevValue - 25, 0));
            onValueChange(Math.max(value - 25, 0))
        } else {
            // setValue((prevValue) => Math.max(prevValue - 0.25, 0));
            onValueChange(Math.max(value - 0.25, 0))
        }
    }

    const handleInputChange = (e: InputNumberValueChangeEvent) => {
        const inputValue = e.value as number;
        console.log('a', inputValue)
        if (inputValue >= 0) {
            // setValue(inputValue);
            onValueChange(inputValue)
            console.log('1');
        } else {
            onValueChange(0)
            console.log('0');
        }
    }

    return (
        <div className={`flex flex-col items-center  w-1/2 border border-gray-300 p-1 rounded bg-slate-800 ${className}`}>
            <h1 className="text-white text-xs">{label}</h1>
            <div className="flex items-center justify-center w-full">
                <Button onClick={handleReduce} className="border rounded text-white w-6 " icon="pi pi-caret-down" aria-label="Filter" />
                <div className="w-1/2 mx-2">
                    <InputNumber value={value} onValueChange={handleInputChange} minFractionDigits={label == 'Points' ? 0 : 2} maxFractionDigits={label == 'Points' ? 0 : 2} min={0} max={label === 'Points' ? contextData?.userScore : 10} />
                </div>
                <Button onClick={handleIncrease} className="border rounded text-white w-6" icon="pi pi-caret-up" aria-label="Filter" />
            </div>
        </div>
    )
}

export default DataInput