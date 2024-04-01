import React, { useEffect, useState } from "react"
import LineGraph from './lineGraph'

interface Props {
    guessingNum: number;
    statu: boolean
}

const GameBoard: React.FC<Props> = ({ guessingNum, statu }) => {
    const [textColor, setTextColor] = useState<string>('text-white');
    const [isInitialRender, setIsInitialRender] = useState<boolean>(true);

    useEffect(() => {
        if (isInitialRender) {
            setTextColor('text-white');
            setIsInitialRender(false);
            return;
        }
        if (statu) {
            setTextColor('text-white');
        } else {
            setTextColor('text-orange-600');
            console.log('2', statu, textColor);
        }
    }, [statu]);


    return (
        <div className="relative h-full">
            <div className={`absolute left-1/3 bottom-2/4 font-bold text-7xl ${textColor}`}>{guessingNum.toFixed(2)}<span className="text-4xl">x</span></div>
            <div className="h-full  pb-10" >
                <LineGraph guessNumber={guessingNum} />
            </div>
        </div>
    )
}

export default GameBoard