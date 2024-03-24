import { useState, useContext } from "react";
import DataInput from "./dataInput"
import { Button } from 'primereact/button';
import CurrentRound from "./currentRound";
import CustomSlider from "./customSlider";
import { DataContext } from "../page";
import { generateData } from "@/utils/generateUser.js"

interface Props {
    onStart: (newData: number) => void;
    setGuessingNum: (newValue: number) => void;
    onUpdateCurRoundData: (newValue: PlayerData[]) => void;
    statu: boolean;
    setStatu: (newValue: boolean) => void;
}
interface PlayerData {
    name: string;
    points: number;
    multiplier: number;
    result?: boolean
}

const ControlBoard: React.FC<Props> = ({ onStart, setGuessingNum, onUpdateCurRoundData, statu, setStatu }) => {
    const [points, setPoints] = useState<number>(100);
    const [multiplier, setMultiplier] = useState<number>(1);
    const [durationNum, setDurationNum] = useState<number>(3000);
    const { userScore } = useContext(DataContext) ?? {}
    const [curRoundData, setcurRoundData] = useState<PlayerData[]>([])

    const handleStart = () => {
        if (points == 0) {
            return alert("you forget to set Points")
        }
        if (userScore !== undefined && userScore < points) {
            return alert("You don't have enough Points")
        }
        setStatu(true)
        onStart(points)

        const playerArray = generateData(4);
        setcurRoundData([{ name: 'You', points, multiplier }, ...playerArray])

        let num = 0;
        const target = Math.random() * 10;
        const interval = 20;
        const duration = durationNum
        const steps = (target - num) / ((duration - interval) / interval);

        const increaseNumber = () => {
            num += steps;
            if (num >= target) {
                num = target;
                clearInterval(timer);
                setStatu(false)

                let winScore: number | 0;
                if (target >= multiplier) {
                    winScore = points * multiplier
                    onStart(-winScore)
                }

                setcurRoundData(prevData => prevData.map(player => {
                    const newPoints = player.multiplier >= target ? 0 : player.points * player.multiplier;
                    return { ...player, points: newPoints, result: true };
                }));
                onUpdateCurRoundData(curRoundData)

            }
            setGuessingNum(num);
        };
        const timer = setInterval(increaseNumber, interval);



    }
    const handlePointsChange = (newValue: number) => {
        setPoints(newValue);
    }

    const handleMultiplierChange = (newValue: number) => {
        setMultiplier(newValue);
    }
    const handleSliderChange = (newValue: number) => {
        const duration = 3000 - (newValue * 20)
        setDurationNum(duration);
    }

    return (
        <div className="px-2">
            <div className="flex justify-between w-full">
                <DataInput value={points} onValueChange={handlePointsChange} className="mr-3" label="Points" />
                <DataInput value={multiplier} onValueChange={handleMultiplierChange} label="Multiplier" />
            </div>
            <Button disabled={statu} onClick={handleStart} className={`h-8 w-full my-4 rounded text-white ${statu ? 'bg-gray-600' : 'bg-orange-600'}`} label={statu ? 'Started' : 'Start'} />
            <CurrentRound dataArray={curRoundData} />
            <CustomSlider onSliderChange={handleSliderChange} />
        </div>
    )


}

export default ControlBoard