import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import React, { useState } from "react";


const Chat: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [chatData, setChatData] = useState<string[]>([]);

    const handleStart = () => {
        if (value.trim() !== '') {
            setChatData(prevChatData => [value, ...prevChatData]);
            setValue('');
        }

    }
    return (
        <div className='text-white'>
            <h1>Chat</h1>
            <div className="flex flex-col justify-between bg-slate-800 mt-1 h-48">
                <div className='flex flex-col-reverse h-32 pl-2 py-1 overflow-y-auto'>
                    {chatData.map((message, index) => (
                        <div key={index}><span className='text-red-400 mr-1'>You:</span>{message}</div>
                    ))}
                </div>
                <div className='flex h-14 p-3 bg-slate-500'>
                    <InputText value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} className='h-8  mr-3' />
                    <Button label='start' onClick={handleStart} className={`h-8 w-1/6 rounded text-white bg-orange-600`} />
                </div>
            </div>
        </div>
    )
}

export default Chat