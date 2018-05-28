using HGT.Models;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HGT.Controllers
{
    public class PaymentController: Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public IActionResult Charge(string stripeEmail, string stripeToken)
        {
            var customers = new StripeCustomerService();
            var charges = new StripeChargeService();

            var customer = customers.Create(new StripeCustomerCreateOptions
            {
                Email = stripeEmail,
                SourceToken = stripeToken
            });

            var charge = charges.Create(new StripeChargeCreateOptions
            {
                Amount = 50000,
                Description = "Pay This Amount to proceed",
                Currency = "inr",
                CustomerId = customer.Id
            });

            return View();
        }

        [HttpPost]
        public JsonResult Pay([FromBody]StripePaymentRequest paymentRequest)
        {

            try
            {
                StripeConfiguration.SetApiKey("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

                var myCharge = new StripeChargeCreateOptions();
                myCharge.SourceTokenOrExistingSourceId = paymentRequest.tokenId;
                myCharge.Amount = paymentRequest.amount;
                myCharge.Currency = "gbp";
                myCharge.Description = paymentRequest.productName;
                myCharge.Metadata = new Dictionary<string, string>();
                myCharge.Metadata["OurRef"] = "OurRef-" + Guid.NewGuid().ToString();

                var chargeService = new StripeChargeService();
                StripeCharge stripeCharge = chargeService.Create(myCharge);
                return Json(stripeCharge);
            }
            catch (StripeException ex)
            {
                return new JsonResult(new { status = ex.Message});
            }
        }
    }
}
