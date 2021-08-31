import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

export function AppMenu() {
    return (
        <nav>
            <span>
                <Link to={AppRoutes.home}>Trades</Link>
            </span>
            <span>
                <Link to={AppRoutes.createTrade}>Create Trade</Link>
            </span>
        </nav>
    );
}
