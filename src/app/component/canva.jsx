import React, { useState, useRef, useEffect } from "react";

const CurveGenerator = () => {
    const canvasRef = useRef(null);
    const [data, setData] = useState([]);
    const xAxisLabels = Array.from({ length: 11 }, (_, i) => i);

    useEffect(() => {
        drawCurve();
    }, [data]);

    const drawCurve = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let i = 0; i < data.length; i++) {
            const x = (canvas.width / 10) * i;
            const y = canvas.height - data[i] * (canvas.height / 10);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        drawXAxis();
    };

    const drawXAxis = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();
        ctx.textAlign = "center";
        ctx.fillText("0", 0, canvas.height + 15);
        for (let i = 1; i < xAxisLabels.length; i++) {
            const x = (canvas.width / 10) * i;
            ctx.fillText(`${xAxisLabels[i]}`, x, canvas.height + 15);
        }
    };

    const generateRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 11); // Generate random number between 0 and 10
        setData((prevData) => [...prevData, randomNumber]);
    };

    return (
        <div className="flex">
            <canvas
                ref={canvasRef}
                width={500}
                height={300}
                style={{ border: "1px solid black", marginBottom: "20px" }}
            />
            <button onClick={generateRandomNumber}>Generate Random Number</button>
        </div>
    );
};

export default CurveGenerator;
