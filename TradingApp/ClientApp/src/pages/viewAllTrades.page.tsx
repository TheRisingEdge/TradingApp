import React, { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { IServerSideDatasource, IServerSideGetRowsParams, SelectionChangedEvent } from "ag-grid-community";
import { SearchBox } from "./SearchBox";
import { DeleteButton } from "./DeleteButton";

type Trade = {
    make: string,
    model: string,
    price: number
}

async function fetchTrades(): Promise<Trade[]> {
    type Response = { trades: Trade[]};

    var result = await fetch('/api/trades')
    var data = await result.json();
    return (data as Response).trades;
}

function deleteTrades(p: any): Promise<number> {
    return Promise.resolve(1);
}

export function Trades() {
    const [rowData, setRowData] = useState<Trade[]>([]);
    const [selectedRows, setSelectedRows] = useState<Trade[]>([]);

    const onSelectionChanged = (s: SelectionChangedEvent) => {
        const selectedTrades = s.api.getSelectedRows() as Trade[];
        setSelectedRows(selectedTrades);
    }

    const onDelete = () => {
        var tradeIds = selectedRows.map(x => x.make);
        deleteTrades(tradeIds)
            .then(() => fetchTrades())
            .then((trades) => setRowData(trades));
    }

     useEffect(() => {
        fetchTrades()
            .then(trades => setRowData(trades));
     }, []);

    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: 800 }}>
            <SearchBox name="hello" onSubmit={(v) => { }} />

            <AgGridReact
                rowSelection={'multiple'}
                rowData={rowData}
                onSelectionChanged={onSelectionChanged}
            >
                <AgGridColumn field="make" filter={true} checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="model"></AgGridColumn>
                <AgGridColumn field="price"></AgGridColumn>
            </AgGridReact>

            <DeleteButton callback={onDelete} />
        </div>
    );
}

