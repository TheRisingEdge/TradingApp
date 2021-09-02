import { Maybe } from "purify-ts";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import "./AppDatePicker.style.css"

export type AppDatePickerProps = {
    onChange: (date: Maybe<Date>) => void
}

export function AppDatePicker(props: AppDatePickerProps) {
    const [date, setDate] = useState<Date | null>(null);

    const onChange = (date: Date | null) => {
        setDate(date);
        props.onChange(Maybe.fromFalsy(date));
    }

    return (<div style={{ display: "inline-flex" }}>
        <DatePicker
            selected={date}
            isClearable
            wrapperClassName="myDatePicker"
            dateFormat="MMMM d, yyyy"
            className="form-control"
            name="startDate"
            onChange={date => onChange(date as Date)} />
    </div>);
}
