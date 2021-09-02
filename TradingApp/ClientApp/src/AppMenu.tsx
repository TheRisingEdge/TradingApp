import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import "./AppMenu.style.css";

export function AppMenu() {
    return (
        <nav>
            {LinkTo(AppRoutes.home, "Trades")}
            {LinkTo(AppRoutes.createTrade, "Create Trade")}
        </nav>
    );
}

function LinkTo(route: string, text: string) {
    return <span className="myLink">
        <Link to={route}>{text}</Link>
    </span>
}
