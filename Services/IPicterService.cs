using AlignImageGalery.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AlignImageGalery.Services
{
    interface IPicterService
    {
        Task<List<Image>> GetImages();
    }
}
