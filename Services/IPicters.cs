using AlignImageGalery.Models;
using System.Collections.Generic;

namespace AlignImageGalery.Services
{
    interface IPicters
    {
        List<Image> GetImages();
    }
}
