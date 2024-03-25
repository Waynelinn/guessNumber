import React, { useEffect, useState, useRef } from 'react';

interface Props {
    guessNumber: number
}

const LineGraph: React.FC<Props> = ({ guessNumber }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [numbersArray, setNumbersArray] = useState<number[]>([]);

    const generateRandomArray = (minLength: number, maxLength: number, maxValue: number): number[] => {
        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        const array = [];
        for (let i = 0; i < length - 1; i++) {
            array.push(Math.floor(Math.random() * maxValue + 1));
        }
        array.push(0);
        array.sort((a, b) => a - b);
        return array;
    };

    useEffect(() => {
        setNumbersArray(generateRandomArray(5, 20, guessNumber));
    }, [guessNumber]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');


        if (ctx && canvas) {
            const DPI_WIDTH = canvas.width;
            const DPI_HEIGHT = canvas.height;

            ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);

            ctx.beginPath();

            for (let index = 0; index < numbersArray.length; index++) {
                const x = numbersArray[index];
                const y = Math.min((x - 2) ** 3 / DPI_HEIGHT * 2);
                if (x === 0) {
                    ctx.moveTo(x + 15, DPI_HEIGHT); // start point
                } else {
                    ctx.lineTo(x * DPI_WIDTH / 10, DPI_HEIGHT - y * DPI_HEIGHT / 10);
                }
            }

            ctx.strokeStyle = 'red';

            ctx.stroke();
        }

    }, [guessNumber]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas ref={canvasRef} id="myCanvas" style={{ width: '100%', height: '100%' }} ></canvas>
            <div style={{ position: 'absolute', bottom: -20, width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
                {Array.from({ length: 11 }, (_, i) => i).map(num => (
                    <div key={num} style={{ flex: 1, textAlign: 'center' }}>{num}</div>
                ))}
            </div>
        </div>
    );
};

export default LineGraph;
