import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState, useEffect } from "react";

interface round {
    name: string;
    points: number;
    multiplier: number;
    result?: boolean
}

interface Props {
    dataArray: round[]
}

const currentRound: React.FC<Props> = ({ dataArray }) => {
    const initialData = [
        {
            name: 'You',
            points: -1,
            multiplier: -1
        },
        {
            name: 'Cpu1',
            points: -1,
            multiplier: -1
        },
        {
            name: 'Cpu2',
            points: -1,
            multiplier: -1
        },
        {
            name: 'Cpu3',
            points: -1,
            multiplier: -1
        },
        {
            name: 'Cpu4',
            points: -1,
            multiplier: -1
        }
    ]
    const [data, setData] = useState<round[]>();

    useEffect(() => {
        if (dataArray && dataArray.length > 0) {
            setData(dataArray);
        } else {
            setData(initialData);
        }
    }, [dataArray]);

    const multiplierTemplate = (data: round) => {
        return data.multiplier < 0 ? '-' : data.multiplier.toFixed(2)
    }
    const pointTemplate = (data: round) => {
        return data.points < 0 ? '-' : data.points.toFixed(2)
    }

    const rowClass = (rowData: round) => {
        if (rowData.result) {
            return rowData.points === 0 ? 'text-red-600' : 'text-green-600';
        }
    };

    return (
        <div className="text-white">
            <h1>Current Round</h1>
            <div >
                <DataTable value={data} stripedRows className='text-xs' rowClassName={rowClass} >
                    <Column align="center" headerClassName='p-1' className='p-1' field="name" header="Name"></Column>
                    <Column align="center" headerClassName='p-1' className='p-1' field="points" header="Point" body={pointTemplate}></Column>
                    <Column align="center" headerClassName='p-1' className='p-1' field="multiplier" header="Multiplier" body={multiplierTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default currentRound