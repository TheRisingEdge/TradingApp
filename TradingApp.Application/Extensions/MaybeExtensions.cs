using CSharpFunctionalExtensions;

namespace TradingApp.Application
{
    public static class MaybeExtensions
    {
        public static Maybe<T> AsMaybe<T>(this T? @this) where T : struct
        {
            return @this.HasValue ?
                Maybe.From(@this.Value) :
                Maybe.None;
        }

        public static Maybe<string> AsMaybe(this string @this)
        {
            return string.IsNullOrWhiteSpace(@this) ?
                Maybe.None :
                Maybe.From<string>(@this);
        }
    }
}
