using System.Linq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TradingApp.Application;
using TradingApp.Domain;

namespace TradingApp.Infrastructure
{
    public class TradingContext : ITradingContext
    {
        private readonly EfContextImplementation _efContext;

        public IQueryable<Trade> Trades => _efContext.Trades;

        public TradingContext(EfContextImplementation efContext)
        {
            _efContext = efContext;
        }

        public T Add<T>(T t) where T : class, IHasId => _efContext.Add(t).Entity;
        public void Delete<T>(IEnumerable<IdOf<T>> ids) where T : class, IHasId => _efContext.DeleteByIds(ids);
        public Task<int> SaveChangesAsync(CancellationToken cancellationToken) => _efContext.SaveChangesAsync();
    }
}
