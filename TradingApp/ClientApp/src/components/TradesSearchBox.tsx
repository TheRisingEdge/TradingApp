import { Maybe } from "purify-ts";
import React, { useState } from "react";
import { AppDatePicker } from "./AppDatePicker";

export type TradeSearchBoxProps = {
    onSearch: (tradeId: Maybe<string>, date: Maybe<Date>) => void;
}

export function TradesSearchBox(props: TradeSearchBoxProps) {
    const [tradeId, setTradeId] = useState<Maybe<string>>(Maybe.empty());
    const [date, setDate] = useState<Maybe<Date>>(Maybe.empty());

    return (
        <>
            <input
                type='text'
                placeholder="TradeId"
                onChange={e => setTradeId(Maybe.fromFalsy(e.target.value))} />

            <AppDatePicker onChange={maybeDate => setDate(maybeDate)} />

            <input
                type="button"
                value="Search"
                className="btn btn-primary"
                style={{display: "inline-block"}}
                onClick={x => props.onSearch(tradeId, date)} />
        </>
    );
}