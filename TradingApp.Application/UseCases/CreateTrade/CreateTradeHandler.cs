using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using TradingApp.Domain;
using CSharpFunctionalExtensions;

namespace TradingApp.Application
{
    public class CreateTradeRequest : IRequest<Result<CreateTradeResponse>>
    {
        public string SecurityCode { get; set; }
        public int Price { get; set; }
        public DateTime Date { get; set; }
        public int SequenceNumberDigitsLength { get; set; }
        public string SequenceNumber { get; set; }
    }

    public class CreateTradeResponse
    {
        public int Id { get; set; }
    }

    public class CreateTradeHandler : IRequestHandler<CreateTradeRequest, Result<CreateTradeResponse>>
    {
        private readonly ITradingContext _context;
        private readonly IGenerateUniqueTradeIds _uniqueTradeIds;

        public CreateTradeHandler(ITradingContext context, IGenerateUniqueTradeIds tradeIdGenerator)
        {
            _context = context;
            _uniqueTradeIds = tradeIdGenerator;
        }

        public async Task<Result<CreateTradeResponse>> Handle(CreateTradeRequest request, CancellationToken cancellationToken)
        {
            var price = TradePrice.TryCreate(request.Price);
            var securityCode = SecurityCode.TryCreate(request.SecurityCode);
            var sequenceNumber = SequenceNumber.TryCreate(request.SequenceNumber, request.SequenceNumberDigitsLength);
            var tradeId = await sequenceNumber.Map(x => _uniqueTradeIds.GenerateFrom(x, cancellationToken));

            var trade = Result.Combine(tradeId, price, securityCode, sequenceNumber)
                .Bind(() => Trade.TryCreate(
                    tradeId.Value,
                    price.Value,
                    request.Date,
                    securityCode.Value,
                    sequenceNumber.Value));

            return await trade
                .Map(t => _context.Add(t))
                .Map(t => _context.SaveChangesAsync(cancellationToken))
                .Map((_) => new CreateTradeResponse { Id = trade.Value.Id });
        }
    }
}
