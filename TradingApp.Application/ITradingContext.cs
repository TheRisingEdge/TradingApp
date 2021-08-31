using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TradingApp.Domain;

namespace TradingApp.Application
{
    public interface ITradingContext
    {
        IQueryable<Trade> Trades { get; }

        T Add<T>(T t) where T : class, IHasId;
        void Delete<T>(IEnumerable<IdOf<T>> ids) where T : class, IHasId;

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
