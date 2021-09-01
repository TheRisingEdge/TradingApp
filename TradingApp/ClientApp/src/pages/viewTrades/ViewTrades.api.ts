export type Trade = {
    id: number,
    tradeId: string,
    securityCode: string,
    sequenceNumber: string,
    price: number,
    date: Date
}

export async function fetchTrades(): Promise<Trade[]> {
    type Response = { trades: Trade[]};

    var result = await fetch('/api/trades')
    var data = await result.json();
    return (data as Response).trades;
}

function deleteTrades(p: any): Promise<number> {
    return Promise.resolve(1);
}

