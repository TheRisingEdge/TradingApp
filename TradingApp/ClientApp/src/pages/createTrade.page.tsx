import React, {  } from "react";
import { useHistory } from "react-router";
import { postTrade } from "./CreateTrade.api";
import { CreateTradeForm, FormValues } from "./CreateTrage.form";

export function CreateTrade() { 
    const history = useHistory();

    const onSubmit = (v: FormValues) => {
        return postTrade(v)
            .then(() => history.goBack());
    }

    return <CreateTradeForm onSubmit={onSubmit}/>
}