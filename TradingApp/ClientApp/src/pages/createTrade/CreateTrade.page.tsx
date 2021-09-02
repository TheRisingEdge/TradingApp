import React, { useState } from "react";
import { useHistory } from "react-router";
import { CreateTradeForm, ValidatedFormValues } from "./CreateTrage.form";
import * as api from "./CreateTrade.api";

export function CreateTradePage() {
    const history = useHistory();
    const [errorFromServer, setErrorFromServer] = useState("");

    const onSubmit = (formValues: ValidatedFormValues) => api
        .createTrade(formValues)
        .then((response) => response
            .ifRight(() => history.goBack())
            .ifLeft((error) => setErrorFromServer(error)))
        .catch(e => console.log(e))

    return (<>
        <CreateTradeForm onSubmit={onSubmit} />
        <div>{errorFromServer}</div>
    </>);
}