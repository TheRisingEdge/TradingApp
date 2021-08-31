using CSharpFunctionalExtensions;
using System;
using System.Text.RegularExpressions;

namespace TradingApp.Domain
{
    public static class ValidationExtensions
    {
        public static Result<T> Ensure<T>(this T @this, Func<T, bool> test, string error) =>
            Result.SuccessIf(test(@this), @this, error);

        public static bool MatchesRegex(this string @this, string regex)
        {
            Regex rgx = new Regex(regex);
            return rgx.IsMatch(@this);
        }
    }
}
