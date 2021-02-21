using AlignImageGalery.Models;
using AlignImageGalery.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AlignImageGalery.Controllers
{
    public class ImagesController : Controller
    {
        private readonly IMemoryCache _cache;

        public ImagesController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        [HttpGet]
        public async Task<JsonResult> GetRandomFive()
        {
            var picsum = new PicsumService();

            if (!_cache.TryGetValue("Images", out List<Image> images))
            {
                images = await picsum.GetImages();

                var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(600));
                _cache.Set("Images", images, cacheEntryOptions);
            }

            return Json(images);
        }

    }
}
