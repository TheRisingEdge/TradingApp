using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using TradingApp.Application;
using TradingApp.Domain;

namespace TradingApp.Infrastructure
{
    public class EfContextImplementation : DbContext
    {
        public DbSet<Trade> Trades { get; set; }

        public EfContextImplementation(DbContextOptions<EfContextImplementation> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TradeEntityConfig());

            //modelBuilder.Entity<Trade>(b => {
            //    var trade = (Trade)Activator.CreateInstance(typeof(Trade), true);
            //    trade.Id = 1;

            //    b.HasData(trade);
            //    b.OwnsOne(x => x.TradeId).HasData(TradeId.TryCreate("UIBHGYTNHUJM*&").Value);
            //    //b.OwnsOne(x => x.Price).HasData(TradePrice.TryCreate(23).Value);
            //    //b.OwnsOne(x => x.SecurityCode).HasData(SecurityCode.TryCreate("ABM").Value);
            //    //b.OwnsOne(x => x.SequenceNumber).HasData(SequenceNumber.TryCreate("asdf", 4).Value);
            //});
        }

        public void DeleteByIds<T>(IEnumerable<IdOf<T>> ids) where T : class, IHasId
        {
            var entities = CreateEntitiesWith(ids);
            Set<T>().RemoveRange(entities);
        }

        private IEnumerable<T> CreateEntitiesWith<T>(IEnumerable<IdOf<T>> ids) where T : class, IHasId
        {
            foreach (var id in ids)
            {
                var e = Activator.CreateInstance<T>();
                e.Id = id.Id;
                yield return e;
            }
        }
    }
}
