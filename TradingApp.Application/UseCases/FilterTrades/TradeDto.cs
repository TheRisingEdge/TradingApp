using System;
using TradingApp.Domain;
using AutoMapper;

namespace TradingApp.Application
{
    public class TradeDto : IMapFrom<Trade>
    {
        public int Id { get; set; }
        public string TradeId { get; set; }
        public string SecurityCode { get; private set; }
        public int Price { get; private set; }
        public string SequenceNumber { get; private set; }
        public DateTime Date { get; private set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Trade, TradeDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.TradeId, opt => opt.MapFrom(s => s.TradeId.Value))
                .ForMember(d => d.SecurityCode, opt => opt.MapFrom(s => s.SecurityCode.Value))
                .ForMember(d => d.Price, opt => opt.MapFrom(s => s.Price.Value))
                .ForMember(d => d.SequenceNumber, opt => opt.MapFrom(s => s.SequenceNumber.Value))
                .ForMember(d => d.Date, opt => opt.MapFrom(s => s.Date));
        }
    }
}
