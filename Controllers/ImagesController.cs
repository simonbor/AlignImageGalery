using AlignImageGalery.Models;
using AlignImageGalery.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlignImageGalery.Controllers
{
    public class ImagesController : Controller
    {
        private readonly IMemoryCache _cache;
        private const int IMAGES_SET_EXPIRATION = 600;
        private PicsumService picsumService;

        public ImagesController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
            picsumService = new PicsumService();
        }

        public async Task<JsonResult> GetRandomFive([FromQuery] int set)
        {
            if (!_cache.TryGetValue("Images", out List<Image> images))
            {
                // get images json and shuffle the order
                images = await picsumService.GetImages();
                images = images.OrderBy(i => Guid.NewGuid()).ToList();

                // cashe json
                var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(IMAGES_SET_EXPIRATION));
                _cache.Set("Images", images, cacheEntryOptions);
            }

            // each time take new set of five by the set counter
            var setOfFive = images.Take(set * 5).Skip((set - 1) * 5);
            return Json(setOfFive);
        }

    }
}
