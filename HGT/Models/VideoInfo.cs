using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HGT.Models
{
    public class VideoInfo
    {
        public long ID { get; set; }
        public string Path { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public bool IsReviewed { get; set; }
        public DateTime UploadDateTime { get; set; }
        public long Likes { get; set; }
        public bool  IsFeatured { get; set; }
        public int Donation { get; set; }
        public bool SuperVideo { get; set; }
        public int SpamCount { get; set; }
        public string UniqueID { get; set; }
    }
}
