import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState, useEffect } from "react";

interface PlayerData {
    name: string;
    points: number;
    multiplier?: number;
    result?: boolean
}
interface Props {
    dataArray: PlayerData[]
}

const Ranking: React.FC<Props> = ({ dataArray }) => {
    const initialData = [
        {
            name: '-',
            points: -1
        },
        {
            name: '-',
            points: -1
        },
        {
            name: '-',
            points: -1
        },
        {
            name: '-',
            points: -1
        },
        {
            name: '-',
            points: -1
        },
    ]
    const [data, setData] = useState<PlayerData[]>(initialData);

    useEffect(() => {
        if (dataArray && dataArray.length > 0) {
            setData(dataArray);
        } else {
            setData(initialData);
        }
    }, [dataArray]);

    const pointTemplate = (data: PlayerData) => {
        return data.points < 0 ? '-' : data.points.toFixed(2)
    }

    const rowClass = (rowData: PlayerData) => {
        if (rowData.name == 'You') {
            return 'bg-slate-500';
        }
    };

    return (
        <div className='text-white'>
            <h1>Ranking</h1>
            <div className='bg-slate-900'>
                <DataTable value={data} sortField="points" sortOrder={-1} stripedRows className='text-xs mt-1' rowClassName={rowClass} >
                    <Column align="center" headerClassName='p-2' className='p-2' header="No." headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                    <Column align="center" headerClassName='p-2' className='p-2' field="name" header="Name"></Column>
                    <Column align="center" headerClassName='p-2' className='p-2' field="points" sortable header="Score" body={pointTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default Ranking