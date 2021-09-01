import React, { } from "react";
import { useHistory } from "react-router";
import { CreateTradeForm, FormValues } from "./CreateTrage.form";
import * as api from "./CreateTrade.api";

export function CreateTradePage() {
    const history = useHistory();

    const onSubmit = (formValues: FormValues) => api
        .createTrade(formValues)
        .then((response) => response
            .ifRight(() => history.goBack())
            .ifLeft((error) => console.log(error)))
        .catch(e => console.log(e))

    return <CreateTradeForm onSubmit={onSubmit} />
}