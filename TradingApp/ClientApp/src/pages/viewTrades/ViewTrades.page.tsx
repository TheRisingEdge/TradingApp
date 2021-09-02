import React, { useEffect, useState } from "react";
import { TradesSearchBox } from "../../components/TradesSearchBox";
import { DeleteButton } from "../../components/DeleteButton";
import { TradeGridRow, ViewTradesGrid } from "./ViewTrades.grid";
import { filterTrades, FilterTradesRequest, deleteTrades, DeleteTradesRequest } from "./ViewTrades.api";
import { Maybe, NonEmptyList } from "purify-ts";

const allTradesFilter: FilterTradesRequest = {
    tradeId: Maybe.empty(),
    date: Maybe.empty()
};

export function Trades() {
    const [trades, setTrades] = useState<TradeGridRow[]>([]);
    const [selectedRows, setSelectedRows] = useState<TradeGridRow[]>([]);

    const onSelectionChanged = (rows: TradeGridRow[]) => setSelectedRows(rows);

    const showAllTrades = () => showTradesFor(allTradesFilter);

    const showTradesFor = (filter: FilterTradesRequest) =>
        filterTrades(filter)
            .then(trades => setTrades(trades))
            .then(() => setSelectedRows([]));

    const onDelete = () =>
        NonEmptyList.fromArray(selectedRows.map(x => x.id))
            .map(ids => deleteTrades(new DeleteTradesRequest(ids)))
            .map(deleting => deleting
                .then(showAllTrades));

    const onSearch = (tradeId: Maybe<string>, date: Maybe<Date>) =>
        showTradesFor({ tradeId, date });

    useEffect(() => {
        showAllTrades()
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