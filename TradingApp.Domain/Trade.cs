using CSharpFunctionalExtensions;
using System;

namespace TradingApp.Domain
{
    public sealed class Trade : IHasId
    {
        public int Id { get; set; }
        public string TradeId { get; private set; }
        public string SecurityCode { get; private set; }
        public int Price { get; private set; }
        public string SequenceNumber { get; private set; }
        public DateTime Date { get; private set; }
        public Trade() { }

        public static Result<Trade> TryCreate(
            TradeId tradeId,
            TradePrice price,
            DateTime date,
            SecurityCode securityCode,
            SequenceNumber sequenceNumber)
        {
            return new Trade()
            {
                TradeId = tradeId.Value,
                Price = price.Value,
                Date = date,
                SecurityCode = securityCode.Value,
                SequenceNumber = sequenceNumber.Value
            };
        }
    }
}
