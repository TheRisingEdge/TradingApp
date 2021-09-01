import { Either, Left, Right } from "purify-ts";

export type Trade = {
    id: number,
    tradeId: string,
    securityCode: string,
    sequenceNumber: string,
    price: number,
    date: Date
}

export type FilterTradesRequest = {
    tradeId?: string,
    date?: Date
}

export class DeleteTradesRequest {
    ids: number[];

    constructor(ids: number[]) {
        this.ids = ids;
    }
}

export async function filterTrades(request: FilterTradesRequest): Promise<Trade[]> {
    var params = new URLSearchParams();
    request.tradeId && params.append("tradeId", request.tradeId);
    request.date && params.append("date", request.date.toLocaleDateString());

    var httpResponse = await fetch(`/api/trades?${params.toString()}`);
    var data = await httpResponse.json();

    return data.trades as Trade[];
}

export type DeleteTradesError = string;
export type DeleteTradesOk = boolean;
export type DeleteTradesResponse = Either<DeleteTradesError, DeleteTradesOk>;

export async function deleteTrades(request: DeleteTradesRequest) : Promise<DeleteTradesResponse> {
    var httpResponse = await fetch('/api/trades', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(request)
    });

    switch (httpResponse.status) {
        case 200: return Right(<DeleteTradesOk>(true))
        default: return Left(<DeleteTradesError>(await httpResponse.text()))
    }
}