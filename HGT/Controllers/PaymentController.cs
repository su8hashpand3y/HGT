using HGT.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using HGT.Helper;

namespace HGT.Controllers
{
    public class PaymentController: Controller
    {
        private IConfiguration Configuration { get; }
        private IServiceProvider services { get; }
        public PayUMoneySettings payUMoneySettings { get; }

        public PaymentController(IConfiguration configuration, IServiceProvider services, IOptions<PayUMoneySettings> payUMoneySettings)
        {
            Configuration = configuration;
            this.services = services;
            this.payUMoneySettings = payUMoneySettings.Value;
        }
        public IActionResult Index()
       {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public async Task<IActionResult> PreparePayment()
        {
            try
            {

                string merchantKey = payUMoneySettings.MerchantKey;
                string transactionId = String.Empty;
                decimal amount = 100;
                string productinfo = "A little Info about the product";
                string firstName = "userFirstName";
                string email = "user@email.com";
                string phone = "9999999999";
                string surl = "/payment/index";
                string furl = "/payment/error";
                string hash = string.Empty;
                string service_provider = "payu_paisa";

                string[] hashVarsSeq;
                string hashString = string.Empty;
                string txnid = string.Empty;

                Random rnd = new Random();
                string strHash = Generatehash512(rnd.ToString() + DateTime.Now);
                transactionId = strHash.ToString().Substring(0, 20);


                hashVarsSeq = payUMoneySettings.HashSequence.Split('|');
                hashString = "";
                foreach (string hash_var in hashVarsSeq)
                {
                    if (hash_var == "key")
                    {
                        hashString = hashString + payUMoneySettings.MerchantKey;
                        hashString = hashString + '|';
                    }
                    else if (hash_var == "txnid")
                    {
                        hashString = hashString + transactionId;
                        hashString = hashString + '|';
                    }
                    else if (hash_var == "amount")
                    {
                        hashString = hashString + Convert.ToDecimal(amount);
                        hashString = hashString + '|';
                    }
                    else if (hash_var == "productinfo")
                    {
                        hashString = hashString + productinfo;
                        hashString = hashString + '|';
                    }
                    else if (hash_var == "firstname")
                    {
                        hashString = hashString + firstName;
                        hashString = hashString + '|';
                    }
                    else if (hash_var == "email")
                    {
                        hashString = hashString + email;
                        hashString = hashString + '|';
                    }
                    else
                    {
                       
                        hashString = hashString + "";// isset if else
                        hashString = hashString + '|';
                    }
                }

                hashString += payUMoneySettings.SALT;


                HttpClient client = new HttpClient();
                var payload = new
                {
                    hash = Generatehash512(hashString).ToLower(),
                    hashString ,
                    txnid = transactionId,
                    key = payUMoneySettings.MerchantKey,
                    amount,
                    firstName,
                    email,
                    phone,
                    productinfo,
                    surl,
                    furl,
                    service_provider,
                    payUMoneySettings.PAYU_BASE_URL
                };

                return new JsonResult(payload);
            }

            catch (Exception ex)
            {

            }

            return null;
        }



        public string Generatehash512(string text)
        {

            byte[] message = Encoding.UTF8.GetBytes(text);
            byte[] hashValue;
            SHA512Managed hashString = new SHA512Managed();
            string hex = "";
            hashValue = hashString.ComputeHash(message);
            foreach (byte x in hashValue)
            {
                hex += String.Format("{0:x2}", x);
            }
            return hex;

        }
    }
}
