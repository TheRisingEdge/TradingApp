export type Trade = {
    id: number,
    tradeId: string,
    securityCode: string,
    sequenceNumber: string,
    price: number,
    date: Date
}

export async function fetchTrades(): Promise<Trade[]> {
    var result = await fetch('/api/trades')
    var data = await result.json();
    return data.trades as Trade[];
}

function deleteTrades(p: any): Promise<number> {
    return Promise.resolve(1);
}