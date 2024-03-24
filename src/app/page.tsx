"use client"
import Image from "next/image";
import Welcome from "./component/welcome";
import ControlBoard from "./component/controlBoard";
import Ranking from "./component/ranking";
import Chat from "./component/chat";
import GameBoard from "./component/gameBoard";
import CurveGenerator from './component/canva'
import { useEffect, useState, createContext } from "react";
import { getCurrentTime } from "@/utils/getCurrentTime.js"
import userIcon from "@/image/user.png"
import medalIcon from "@/image/medal.png"
import clockIcon from "@/image/clock.png"

interface ContextType {
  userScore: number;
}
interface PlayerData {
  name: string;
  points: number;
  multiplier: number;
  result?: boolean
}

export const DataContext = createContext<ContextType | null>(null)

export default function Home() {
  const [name, setName] = useState<string>('')
  const [score, setScore] = useState<number>(1000)
  const [currentTime, setCurrentTime] = useState<string>('');
  const [number, setNumber] = useState<number>(0)
  const [rankData, setRankData] = useState<PlayerData[]>([]);
  const [timerOn, setTimerOn] = useState<boolean>(false)

  const handleGetName = (mewData: string) => {
    setName(mewData)
  }

  const handleStart = (mewData: number) => {
    setScore(score - mewData)
  }

  const updateCurRoundData = (data: PlayerData[]) => {
    setRankData(data);
  };

  useEffect(() => {
    setCurrentTime(getCurrentTime())
  }, [])

  const contextData = {
    userScore: score
  }


  return (
    <main className=" min-h-screen px-24 pt-8 pb-4 bg-slate-950 h-full">
      <DataContext.Provider value={contextData}>
        <div className="flex justify-between w-full h-96 mb-4">
          <div className=" w-1/3 mr-5 ">
            {name ? <ControlBoard onStart={handleStart} setGuessingNum={setNumber} onUpdateCurRoundData={updateCurRoundData} statu={timerOn} setStatu={setTimerOn} /> : <Welcome onAcceptName={handleGetName} />}
          </div>
          <div className="w-2/3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-white  w-full mb-3 h-1/6">
              <div className="flex items-center bg-slate-700 w-1/3 h-5/6 rounded">
                <Image
                  src={userIcon}
                  alt="Picture of the author"
                  width={40}
                />
                <span className="ml-16">{name ? score.toLocaleString() : ''}</span>
              </div>
              <div className="flex items-center bg-slate-700 w-1/3 mx-3 h-5/6 rounded">
                <Image
                  src={medalIcon}
                  alt="Picture of the author"
                  width={40}
                />
                <span className="ml-16">{name}</span>
              </div>
              <div className="flex items-center bg-slate-700 w-1/3 h-5/6 rounded">
                <Image
                  src={clockIcon}
                  alt="Picture of the author"
                  width={40}
                />
                <span className="ml-16">{name ? currentTime : ''}</span>
              </div>
            </div>
            <div className="bg-slate-800 w-full h-5/6">
              <GameBoard guessingNum={number} statu={timerOn} />
              {/* <CurveGenerator /> */}
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full  h-52 ">
          <div className=" w-1/2 mr-5 "><Ranking dataArray={rankData} /></div>
          <div className=" w-1/2  "><Chat /></div>
        </div>
      </DataContext.Provider>
    </main>
  );
}
