﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HGT.Models
{
    public class Comment
    {
        public long ID { get; set; }
        public long VideoId { get; set; }
        public string UserId { get; set; }
        public string CommentText { get; set; }
    }
}
