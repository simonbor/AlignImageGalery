using AlignImageGalery.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AlignImageGalery.Services
{
    public interface IPicterService
    {
        Task<List<Image>> GetImages();
    }
}
