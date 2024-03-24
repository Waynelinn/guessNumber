import React, { useEffect, useRef } from 'react';

const LineGraph: React.FC = () => {
    useEffect(() => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas?.getContext('2d');



        if (ctx) {
            const DPI_WIDTH = canvas.width;
            const DPI_HEIGHT = canvas.height;

            ctx.beginPath();

            const numbersArray: number[] = [0, 1, 2, 3, 4, 5]; // Example array of x-values

            for (const x of numbersArray) {
                const y = (x - 2) ** 3 / 16;
                ctx.lineTo(x * 45, DPI_HEIGHT - y * 55); // Scale y-value and draw line
            }

            ctx.stroke();
        }


    }, []); // Empty dependency array to run only once when component mounts

    return (
        <canvas id="myCanvas" style={{ width: '100%', height: '100%' }}></canvas>
    );
};

export default LineGraph;
