using CSharpFunctionalExtensions;

namespace TradingApp.Domain
{
    public sealed class SecurityCode
    {
        public string Value { get; private set; }

        private SecurityCode(string value)
        {
            Value = value;
        }

        public static Result<SecurityCode> TryCreate(string value) => value
            .Ensure(v => v.Length == 3, "Security code must have exactly 3 characters")
            .Ensure(v => v.MatchesRegex("^[A-Z]{3}$"), "Security code must have 3 upper case characters")
            .Map(v => new SecurityCode(v));
    }
}
