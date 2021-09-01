import React, {  } from "react";
import { useHistory } from "react-router";
import { CreateTradeForm, FormValues } from "./CreateTrage.form";
import * as api from "./CreateTrade.api";

export function CreateTrade() { 
    const history = useHistory();

    const onSubmit = (formValues: FormValues) => {
        return api.createTrade(formValues)
            .then(() => history.goBack());
    }

    return <CreateTradeForm onSubmit={onSubmit}/>
}