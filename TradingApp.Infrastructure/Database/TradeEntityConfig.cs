using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TradingApp.Domain;

namespace TradingApp.Infrastructure
{
    class TradeEntityConfig : IEntityTypeConfiguration<Trade>
    {
        public void Configure(EntityTypeBuilder<Trade> builder)
        {
            builder.OwnsOne(x => x.TradeId);
            builder.OwnsOne(x => x.SecurityCode);
            builder.OwnsOne(x => x.Price);
            builder.OwnsOne(x => x.SequenceNumber);
        }
    }
}