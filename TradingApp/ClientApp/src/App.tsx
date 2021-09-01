import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route} from "react-router-dom";
import { AppMenu } from "./AppMenu";

import { AppRoutes } from "./AppRoutes"
import { CreateTrade } from "./pages/createTrade/CreateTrade.page";
import { Trades } from "./pages/viewTrades/ViewTrades.page";

export default function App() {
    return (
        <Router>
            <AppMenu />
            <Switch>
                <Route path={AppRoutes.createTrade} component={CreateTrade}/>
                <Route path={AppRoutes.home} component={Trades}/>
            </Switch>
        </Router>
    );
}