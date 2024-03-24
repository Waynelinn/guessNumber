import React, { useEffect, useState } from "react"
import LineGraph from './lineGraph'

interface Props {
    guessingNum: number;
    statu: boolean
}

const GameBoard: React.FC<Props> = ({ guessingNum, statu }) => {
    const [textColor, setTextColor] = useState<string>('text-white-600');
    const [isInitialRender, setIsInitialRender] = useState<boolean>(true);

    useEffect(() => {
        if (isInitialRender) {
            setTextColor('text-white-600');
            setIsInitialRender(false);
            return;
        }
        if (statu) {
            setTextColor('text-white-600');
        } else {
            setTextColor('text-orange-600');
        }
    }, [statu]);


    return (
        <div className="relative h-full">
            <div className={`absolute left-1/3 bottom-3/4 font-bold text-white text-7xl ${textColor}`}>{guessingNum.toFixed(2)}<span className="text-4xl">x</span></div>
            <div className="h-full bg-slate-200 pb-4" >
                <LineGraph />
            </div>
        </div>
    )
}

export default GameBoard