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

        public static Maybe<T> AsMaybe<T>(this T @this) where T : class
        {
            return Maybe.From(@this);
        }
    }
}
