namespace AlignImageGalery.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string Url { get; set; }
        public string DownloadUrl { get; set; }     // download_url
    }
}
