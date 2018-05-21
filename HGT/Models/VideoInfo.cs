using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HGT.Models
{
    public class VideoInfo
    {
        public long ID { get; set; }
        public string Title { get; set; }
        public string Format { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string FolderName { get; set; }
        public string FileName { get; set; }
        public string Poster { get; set; }
        public bool IsReviewed { get; set; }
        public DateTime UploadDateTime { get; set; }
        public long Likes { get; set; }
        public bool  IsFeatured { get; set; }
        public int Donation { get; set; }
        public bool SuperVideo { get; set; }
        public int SpamCount { get; set; }
        public string UniqueID { get; set; }
        public bool SponseredVideo { get; set; }

        public string HGTUserID { get; set; }
        public HGTUser HGTUser { get; set; }
    }
}
