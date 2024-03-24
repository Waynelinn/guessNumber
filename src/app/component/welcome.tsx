import { useState } from "react";

interface Props {
    onAcceptName: (newData: string) => void;
}
const Welcome: React.FC<Props> = ({ onAcceptName }) => {
    const [name, setName] = useState<string>('')
    const [btnStatu, setBtnStatu] = useState<boolean>(false)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value.replace(/[^a-zA-Z]/g, '');
        setName(input);
        setBtnStatu(input !== '');
    };
    const sendName = () => {
        if (name == '') return
        onAcceptName(name)
        setName('');
        setBtnStatu(false);
    }
    return (
        <div className="flex flex-col items-center py-24 bg-slate-800 h-96">
            <h1 className="mb-10 text-white front-bold text-2xl">Welcome</h1>
            <div className="text-white text-xs">Please Insert Your Name</div>
            <div className="w-full flex justify-center"><input value={name} onChange={handleInputChange} className="w-1/2 my-2 bg-black text-white" type="text" /></div>
            <button disabled={!btnStatu} onClick={sendName} className={`w-1/2 ${btnStatu ? 'bg-orange-600' : 'bg-gray-600'}`}>Accept</button>
        </div>
    )
}

export default Welcome