import React, { useEffect, useState } from "react";
import { SearchBox } from "../../components/SearchBox";
import { DeleteButton } from "../../components/DeleteButton";
import { TradeGridRow, ViewTradesGrid } from "./ViewTrades.grid";
import * as api from "./ViewTrades.api";
import { Maybe, MaybeAsync } from "purify-ts";

function mapTradeIdsFrom(tradeRows: TradeGridRow[]): Maybe<number[]> {
    const ids = tradeRows.map(x => x.id);
    return Maybe.fromPredicate(ids => ids.length > 0, ids);
} 

function tryDelete(selectedRows: TradeGridRow[]): MaybeAsync<unknown>  {
    var deletingTrades = mapTradeIdsFrom(selectedRows)
        .map(ids => new api.DeleteTradesRequest(ids))
        .map(request => api.deleteTrades(request));
}

export function Trades() {
    const [trades, setTrades] = useState<TradeGridRow[]>([]);
    const [selectedRows, setSelectedRows] = useState<TradeGridRow[]>([]);

    const onSelectionChanged = (rows: TradeGridRow[]) => setSelectedRows(rows);

    const refreshGrid = () : Promise<any> => 
        api.filterTrades({})
        .then(trades => setTrades(trades));

    const onDelete = () => 
        tryDelete(selectedRows)
        .chain(() => refreshGrid());

    useEffect(() => {
        refreshGrid();
    }, []);

    return (<>
        <SearchBox
            name="hello"
            onSubmit={(v) => { }} />

        <ViewTradesGrid
            trades={trades}
            onSelectionChanged={onSelectionChanged} />

        <DeleteButton
            text="Delete Selected Trades"
            callback={onDelete} />
    </>);
}