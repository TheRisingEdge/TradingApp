using System.Threading.Tasks;
using System.Threading;
using System;
using MediatR;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TradingApp.Application
{
    public class FilterTradesRequest : IRequest<FilterTradesResponse>
    {
        public DateTime? Date { get; set; }
        public string TradeId { get; set; }
    }

    public class FilterTradesResponse
    {
        public IEnumerable<TradeDto> Trades { get; set; }
    }

    public class FilterTradesHander : IRequestHandler<FilterTradesRequest, FilterTradesResponse>
    {
        private readonly ITradingContext _context;
        private readonly IConfigurationProvider _mapper;

        public FilterTradesHander(ITradingContext context, IConfigurationProvider mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<FilterTradesResponse> Handle(FilterTradesRequest request, CancellationToken cancellationToken)
        {
            var trades = await _context.Trades
                .FilterBy(request.Date.AsMaybe(), startDate => trade => trade.Date > startDate)
                .FilterBy(request.TradeId.AsMaybe(), tradeId => trade => trade.TradeId.Contains(tradeId))
                .ProjectTo<TradeDto>(_mapper)
                .ToListAsync(cancellationToken);

            return new FilterTradesResponse()
            {
                Trades = trades
            };
        }
    }
}
