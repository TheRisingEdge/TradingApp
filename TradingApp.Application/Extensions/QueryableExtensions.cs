using System.Threading.Tasks;
using System;
using System.Linq;
using CSharpFunctionalExtensions;
using System.Linq.Expressions;

namespace TradingApp.Application
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> FilterBy<T, U>(
            this IQueryable<T> @this,
            Maybe<U> maybeValue,
            Func<U, Expression<Func<T, bool>>> filter)
        {
            return maybeValue.Unwrap((value) => @this.Where(filter(value)), @this);
        }
    }
}
