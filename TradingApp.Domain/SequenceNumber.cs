using CSharpFunctionalExtensions;

namespace TradingApp.Domain
{
    public sealed class SequenceNumber
    {
        public string Value { get; private set; }

        private SequenceNumber() { }

        public static Result<SequenceNumber> TryCreate(string value, int x) => value
            .Ensure(v => v.Length == x, "Sequence number must match it's own length (X)")
            .Map(v => new SequenceNumber() { Value = v });
    }
}
