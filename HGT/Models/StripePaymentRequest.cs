using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HGT.Models
{
    public class StripePaymentRequest
    {
        public string tokenId { get; set; }
        public string productName { get; set; }
        public int amount { get; set; }
    }
}
