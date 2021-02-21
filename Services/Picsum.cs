using AlignImageGalery.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlignImageGalery.Services
{
    public class Picsum : IPicters
    {
        public List<Image> GetImages()
        {
            // get images data feed from https://picsum.photos/v2/list?page=1&limit=100

            return new List<Image>();
        }

    }
}
