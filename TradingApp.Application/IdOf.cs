using TradingApp.Domain;

namespace TradingApp.Application
{
    public struct IdOf<T> where T : IHasId
    {
        public int Id { get; private set; }

        public IdOf(int id)
        {
            Id = id;
        }
    }
}
