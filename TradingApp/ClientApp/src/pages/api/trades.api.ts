export interface FilterTradesRequest {
    startDate: Date,
    tradeIdentifier: string
}

export interface CreateTradeRequest { }

export interface CreateTradeResponse {}

export interface DeleteTrandesRequest { }

export interface Trade { }

export interface TradesResponse {
    trades: Trade[]
}

export class TradesApi {
    CreateTrade(createRequest: CreateTradeRequest): Promise<CreateTradeResponse> {
        return Promise.resolve({});
    }

    GetTrades(filterRequest: FilterTradesRequest): Promise<TradesResponse> {
        const trades: Trade[] = [{}];
        const tradesResponse: TradesResponse = { trades: trades };
        return Promise.resolve(tradesResponse);
    }

    DeleteTrades(deleteRequest: DeleteTrandesRequest): Promise<boolean> {
        return Promise.resolve(true);
    }
}