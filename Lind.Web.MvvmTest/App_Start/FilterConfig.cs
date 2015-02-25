using System.Web;
using System.Web.Mvc;

namespace Lind.Web.MvvmTest
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}