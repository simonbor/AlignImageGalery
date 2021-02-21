using Microsoft.AspNetCore.Mvc;

namespace AlignImageGalery.Controllers
{
    public class GalleryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
