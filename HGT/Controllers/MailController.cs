using HGT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace HGT.Controllers
{
    public class MailController
    {
        private readonly IEmailSender _emailSender;

        public MailController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        public async Task Send()
        {
            await _emailSender.SendEmailAsync("test@gmail.com", "No Subject Is here",
                         $"Welcome Huys");
        }
    }
}
