using CSharpFunctionalExtensions;

namespace TradingApp.Domain
{
    public sealed class TradePrice
    {
        public int Value { get; private set; }

        private TradePrice() { }

        public static Result<TradePrice> TryCreate(int value) => value
            .Ensure(x => x > 0, "Trade price must be positive")
            .Map(x => new TradePrice() { Value = x });
    }
}
