using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using TradingApp.Application;
using TradingApp.Domain;
using TradingApp.Infrastructure;

namespace TradingApp
{
    public static class AppServiceExtensions
    {
        public static IServiceCollection AddDatabase(this IServiceCollection @this) => @this
            .AddDbContext<EfContextImplementation>(b => b.UseInMemoryDatabase("test-db"))
            .AddScoped<ITradingContext, TradingContext>();

        public static IServiceCollection AddDomainServices(this IServiceCollection @this) => @this
            .AddScoped<IGenerateUniqueTradeIds, GenerateUniqueTradeIds>();
    }
}
