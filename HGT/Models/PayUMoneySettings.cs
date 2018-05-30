using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HGT.Models
{
    public class PayUMoneySettings
    {
        public string MerchantKey { get; set; }
        public string PAYU_BASE_URL { get; set; }
        public string HashSequence { get; set; }
        public string SALT { get; set; }
    }
}
