import React from "react";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { SelectionChangedEvent } from "ag-grid-community";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export type TradeGridRow = {
    id: number,
    tradeId: string,
    securityCode: string,
    sequenceNumber: string,
    price: number,
    date: Date
}

export type ViewTradesGridProps = {
    trades: TradeGridRow[],
    onSelectionChanged: (trades: TradeGridRow[]) => void,
}

export function ViewTradesGrid(props: ViewTradesGridProps) {
    const onSelectionChanged = (s: SelectionChangedEvent) => {
        const selectedTrades = s.api.getSelectedRows() as TradeGridRow[];
        props.onSelectionChanged(selectedTrades);
    }

    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: 800 }}>

            <AgGridReact
                rowSelection={'multiple'}
                rowData={props.trades}
                onSelectionChanged={onSelectionChanged}>

                <AgGridColumn field="tradeId" checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="securityCode"></AgGridColumn>
                <AgGridColumn field="sequenceNumber"></AgGridColumn>
                <AgGridColumn field="price"></AgGridColumn>
                <AgGridColumn field="date"></AgGridColumn>
            </AgGridReact>

        </div>
    );
}