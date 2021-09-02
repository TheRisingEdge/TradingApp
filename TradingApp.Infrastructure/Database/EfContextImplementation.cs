using Bogus;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
            modelBuilder.Entity<Trade>().HasData(GenerateSeedData().ToList());
        }

        private IEnumerable<Trade> GenerateSeedData()
        {
            var f = new Faker();

            for (int i = 1; i < 20; i++)
            {
                var tradeId = TradeId.TryCreate(f.Random.String2(14, "EWRZXCVRTRTWEZXCVPOI")).Value;
                var tradePrice = TradePrice.TryCreate(f.Random.Number(1, 100)).Value;
                var securityCode = SecurityCode.TryCreate(f.Random.String2(3, "ASDFGERTOPWNFVBXCPOERWUQER")).Value;
                var date = DateTime.Today.AddDays(f.Random.Double(-30, 30));
                var sequenceNumber = SequenceNumber.TryCreate(f.Random.String2(10, "SDFAZXVSDFWE"), 10).Value;

                var trade = Trade.TryCreate(
                    tradeId,
                    tradePrice,
                    date,
                    securityCode,
                    sequenceNumber).Value;

                trade.Id = i;

                yield return trade;
            }
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
