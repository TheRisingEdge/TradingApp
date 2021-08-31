using System.Threading.Tasks;
using System.Threading;
using MediatR;
using System.Linq;
using TradingApp.Domain;

namespace TradingApp.Application
{
    public class DeleteTradesRequest : IRequest<DeleteTradesResponse>
    {
        public int[] Ids { get; set; }
    }

    public class DeleteTradesResponse
    { }

    public class DeleteTradesHandler : IRequestHandler<DeleteTradesRequest, DeleteTradesResponse>
    {
        private readonly ITradingContext _repository;

        public DeleteTradesHandler(ITradingContext tradesRepository)
        {
            _repository = tradesRepository;
        }

        public async Task<DeleteTradesResponse> Handle(DeleteTradesRequest request, CancellationToken cancellationToken)
        {
            var ids =
                from x in request.Ids.OrEmpty()
                select new IdOf<Trade>(x);

            _repository.Delete(ids);

            await _repository.SaveChangesAsync(cancellationToken);

            return new DeleteTradesResponse();
        }
    }
}
