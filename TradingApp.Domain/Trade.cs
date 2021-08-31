using CSharpFunctionalExtensions;
using System;

namespace TradingApp.Domain
{
    public sealed class Trade : IHasId
    {
        public int Id { get; set; }
        public TradeId TradeId { get; private set; }
        public SecurityCode SecurityCode { get; private set; }
        public TradePrice Price { get; private set; }
        public SequenceNumber SequenceNumber { get; private set; }
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
                TradeId = tradeId,
                Price = price,
                Date = date,
                SecurityCode = securityCode,
                SequenceNumber = sequenceNumber
            };
        }
    }
}
