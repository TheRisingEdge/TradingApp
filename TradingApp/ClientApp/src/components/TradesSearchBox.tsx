import { unknown } from "purify-ts";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type TradeSearchBoxProps = {
    onSearch: (tradeId?: string, date?: Date) => void;
}

export function TradesSearchBox(props: TradeSearchBoxProps) {
    const [tradeId, setTradeId] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
        <>
            <input
                type='text'
                placeholder="TradeId"
                onChange={e => setTradeId(e.target.value)} />

            <DatePicker
                selected={date}
                dateFormat="MMMM d, yyyy"
                className="form-control"
                name="startDate"
                onChange={date => setDate(date as Date)} />

            <input type="submit" value="Search" onClick={x => props.onSearch(tradeId, date)} />
        </>
    );
}
