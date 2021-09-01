import React, { useEffect, useState } from "react";
import { SearchBox } from "../../components/SearchBox";
import { DeleteButton } from "../../components/DeleteButton";
import { TradeGridRow, ViewTradesGrid } from "./ViewTrades.grid";
import * as api from "./ViewTrades.api";

export function Trades() {
    const [trades, setTrades] = useState<TradeGridRow[]>([]);
    const [selectedRows, setSelectedRows] = useState<TradeGridRow[]>([]);

    const onSelectionChanged = (rows: TradeGridRow[]) => {
        setSelectedRows(rows);
    }

    const onDelete = () => {
        console.log(selectedRows);
    }

    useEffect(() => {
        api.fetchTrades()
            .then(trades => setTrades(trades));
    }, []);

    return (<>
        <SearchBox
            name="hello"
            onSubmit={(v) => { }} />

        <ViewTradesGrid
            trades={trades}
            onSelectionChanged={onSelectionChanged} />

        <DeleteButton
            callback={onDelete} />
    </>);
}