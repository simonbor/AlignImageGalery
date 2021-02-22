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

        public ImagesController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        public async Task<JsonResult> GetRandomFive([FromQuery] int set)
        {
            var picsum = new PicsumService();

            if (!_cache.TryGetValue("Images", out List<Image> images))
            {
                images = await picsum.GetImages();
                
                // shuffle the images list
                images = images.OrderBy(i => Guid.NewGuid()).ToList();

                var cacheEntryOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(IMAGES_SET_EXPIRATION));
                _cache.Set("Images", images, cacheEntryOptions);
            }

            var setOfFive = images.Take(set * 5).Skip((set - 1) * 5);

            return Json(setOfFive);
        }

    }
}
