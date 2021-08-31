using System.Linq;
using System.Collections.Generic;

namespace TradingApp.Application
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<T> OrEmpty<T>(this IEnumerable<T> @this) =>
            @this ?? Enumerable.Empty<T>();
    }
}
