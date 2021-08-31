using System.Reflection;

namespace TradingApp.Application
{
    public static class TradingApplication
    {
        public static Assembly Assembly => Assembly.GetAssembly(typeof(TradingApplication));
    }
}
