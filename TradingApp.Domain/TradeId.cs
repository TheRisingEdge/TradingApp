using CSharpFunctionalExtensions;
using System.Threading;
using System.Threading.Tasks;

namespace TradingApp.Domain
{
    public sealed class TradeId
    {
        public static int RequiredLength = 14;

        public string Value { get; private set; }

        private TradeId() { }

        public static Result<TradeId> TryCreate(string value) => value
            .Ensure(v => v.Length == RequiredLength, $"TradeId must have exactly {RequiredLength} characters")
            .Map(v => new TradeId() { Value = value });
    }

    public interface IGenerateUniqueTradeIds
    {
        Task<TradeId> GenerateFrom(SequenceNumber sequence, CancellationToken cancellationToken);
    }
}
