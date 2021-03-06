import { Either, Left, Right } from "purify-ts";

export type CreateTradeRequest = {
    securityCode: string,
    sequenceNumberLength: number,
    sequenceNumber: string,
    price: number,
    date: Date
}

export type CreateTradeError = string;
export type CreateTradeOk = { id: number };
export type CreateTradeResponse = Either<CreateTradeError, CreateTradeOk>;

export async function createTrade(request: CreateTradeRequest): Promise<CreateTradeResponse> {
    var httpResponse = await fetch('/api/trades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(request)
    });

    switch (httpResponse.status) {
        case 400: return Left(<CreateTradeError>(await httpResponse.text()));
        case 200: return Right(<CreateTradeOk>(await httpResponse.json()));
        default: return Left("something went wrong")
    }
}