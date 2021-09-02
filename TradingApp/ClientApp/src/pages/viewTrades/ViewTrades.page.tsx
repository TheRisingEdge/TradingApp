import React, { useEffect, useState } from "react";
import { TradesSearchBox } from "../../components/TradesSearchBox";
import { DeleteButton } from "../../components/DeleteButton";
import { TradeGridRow, ViewTradesGrid } from "./ViewTrades.grid";
import { deleteTrades, DeleteTradesRequest, DeleteTradesResponse, filterTrades, FilterTradesRequest } from "./ViewTrades.api";
import { Maybe, NonEmptyList } from "purify-ts";

function tryDelete(selectedRows: TradeGridRow[]): Maybe<Promise<DeleteTradesResponse>> {
    var ids = selectedRows.map(r => r.id);

    return NonEmptyList.fromArray(ids)
        .map(theIds => new DeleteTradesRequest(theIds))
        .map(request => deleteTrades(request));
}

export function Trades() {
    const [trades, setTrades] = useState<TradeGridRow[]>([]);
    const [selectedRows, setSelectedRows] = useState<TradeGridRow[]>([]);

    const onSelectionChanged = (rows: TradeGridRow[]) =>
        setSelectedRows(rows);

    const fetchAllTrades = () =>
        fetchTradesWith({
            tradeId: Maybe.empty(),
            date: Maybe.empty()
        });

    const fetchTradesWith = (filter: FilterTradesRequest) =>
        filterTrades(filter)
            .then(trades => setTrades(trades));

    const onDelete = () =>
        tryDelete(selectedRows)
            .map(deleting => deleting.then(fetchAllTrades))

    const onSearch = (tradeId: Maybe<string>, date: Maybe<Date>) =>
        fetchTradesWith({ tradeId, date });

    useEffect(() => {
        fetchAllTrades()
    }, []);

    return (<>
        <TradesSearchBox
            onSearch={onSearch} />

        <ViewTradesGrid
            trades={trades}
            onSelectionChanged={onSelectionChanged} />

        <DeleteButton
            text="Delete Selected Trades"
            callback={onDelete} />
    </>);
}