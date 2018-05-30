
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HGT.Models
{
    public class Payment
    {
        public long Id { get; set; }
        public string UserID { get; set; }
        public long Amount { get; set; }
    }
}
