import React, { useState } from "react";
import { Slider, SliderChangeEvent } from "primereact/slider";

interface Props {
    onSliderChange: (newValue: number) => void;
}
const CustomSlider: React.FC<Props> = ({ onSliderChange }) => {
    const [value, setValue] = useState<number>(0);
    const ticks = Array.from(Array(5).keys());

    const handleSlider = (e: SliderChangeEvent) => {
        setValue(e.value as number)
        onSliderChange(e.value as number)
    }
    return (
        <div className="text-white mt-1">
            <h1>Speed</h1>
            <div className="border bg-slate-800 py-3 px-3 rounded ">
                <Slider value={value} onChange={handleSlider} className="w-14rem " />
                <div className="flex justify-between">
                    {ticks.map((_, index) => (
                        <div key={index} className="tick">
                            <span>{index + 1}x</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CustomSlider