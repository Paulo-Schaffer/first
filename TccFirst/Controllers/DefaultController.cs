using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class DefaultController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}