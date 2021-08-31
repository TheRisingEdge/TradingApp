using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TradingApp.Domain;

namespace TradingApp.Infrastructure
{
    public class GenerateUniqueTradeIds : IGenerateUniqueTradeIds
    {
        private const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        public GenerateUniqueTradeIds()
        { }

        public Task<TradeId> GenerateFrom(SequenceNumber sequence, CancellationToken cancellationToken)
        {
            var randomString = GenerateRandomString(TradeId.RequiredLength);

            var tradeId = TradeId.TryCreate(randomString).Value;

            return Task.FromResult(tradeId);
        }

        public string GenerateRandomString(int length)
        {
            var random = new Random();

            return new string(Enumerable.Repeat(chars, length)
             .Select(s => s[random.Next(s.Length)])
             .ToArray()
           );
        }
    }
}
