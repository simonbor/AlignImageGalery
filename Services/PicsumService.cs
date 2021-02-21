using AlignImageGalery.Models;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace AlignImageGalery.Services
{
    public class PicsumService : IPicterService
    {
        const string dataUrl = "https://picsum.photos/v2/list?page=1&limit=100";

        public async Task<List<Image>> GetImages()
        {
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(dataUrl);
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            JsonSerializerOptions options = new() { PropertyNameCaseInsensitive = true };
            return JsonSerializer.Deserialize<List<Image>>(responseBody, options);
        }
    }
}
