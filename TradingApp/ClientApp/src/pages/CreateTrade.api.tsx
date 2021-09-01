export type CreateTradeRequest = {
    securityCode: string,
    sequenceNumberLength: number,
    sequenceNumber: string,
    price: number,
    date: Date
}

export function postTrade(request: CreateTradeRequest) : Promise<Response> {
    return fetch('/api/trades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(request)
    });
}