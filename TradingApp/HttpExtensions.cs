using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using CSharpFunctionalExtensions;

namespace TradingApp.Controllers
{
    public static class HttpExtensions
    {
        public static async Task<IActionResult> ToResponse<T>(this Task<T> task)
        {
            try
            {
                var result = await task;
                return new OkObjectResult(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static async Task<IActionResult> ToResponse<T>(this Task<Result<T>> task)
        {
            try
            {
                var result = await task;

                return result.IsSuccess ?
                    (IActionResult)new OkObjectResult(result.Value) :
                    (IActionResult)new BadRequestObjectResult(result.Error);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
