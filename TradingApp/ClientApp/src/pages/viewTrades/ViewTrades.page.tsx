import React, { useEffect, useState } from "react";
import { SearchBox } from "../../components/SearchBox";
import { DeleteButton } from "../../components/DeleteButton";
import { TradeGridRow, ViewTradesGrid } from "./ViewTrades.grid";
import * as api from "./ViewTrades.api";
import { Maybe, MaybeAsync, NonEmptyList, Nothing } from "purify-ts";

function tryDelete(selectedRows: TradeGridRow[]): MaybeAsync<boolean>  {
    var ids = selectedRows.map(r => r.id);

    const nothing: Maybe<boolean> = Nothing;
    const didNothing = MaybeAsync.liftMaybe(nothing);

    const maybeDeleting = NonEmptyList.fromArray(ids)
        .map(theIds => new api.DeleteTradesRequest(theIds))
        .map(request => api.deleteTrades(request).then((r) => r.toMaybe()))
        .map(deleting => MaybeAsync.fromPromise(() => deleting))
        .orDefault(didNothing);

    return maybeDeleting;
}

export function Trades() {
    const [trades, setTrades] = useState<TradeGridRow[]>([]);
    const [selectedRows, setSelectedRows] = useState<TradeGridRow[]>([]);

    const onSelectionChanged = (rows: TradeGridRow[]) => setSelectedRows(rows);

    const refreshGrid = () : Promise<any> => api
        .filterTrades({})
        .then(trades => setTrades(trades));

    const onDelete = () => 
        tryDelete(selectedRows)
        .map(() => refreshGrid());

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