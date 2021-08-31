import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

export function AppMenu() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={AppRoutes.home}>Trades</Link>
                </li>
                <li>
                    <Link to={AppRoutes.createTrade}>Create Trade</Link>
                </li>
            </ul>
        </nav>
    );
}
