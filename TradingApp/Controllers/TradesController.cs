using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TradingApp.Application;
using MediatR;

namespace TradingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TradesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TradesController(IMediator mediatr)
        {
            _mediator = mediatr;
        }

        [HttpGet]
        public Task<IActionResult> Get([FromQuery] FilterTradesRequest request)
        {
            return _mediator.Send(request).ToResponse();
        }

        [HttpPost]
        public Task<IActionResult> CreateTrade([FromBody] CreateTradeRequest request)
        {
            return _mediator.Send(request).ToResponse();
        }

        [HttpPost]
        public Task<IActionResult> DeleteTrades([FromBody] DeleteTradesRequest request)
        {
            return _mediator.Send(request).ToResponse();
        }
    }
}
