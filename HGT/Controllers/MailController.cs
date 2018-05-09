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
        public void Send()
        {
            SmtpClient client = new SmtpClient("smtp.gmail.com");
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("hackersubhash", "lotus#123");

            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("hackersubhash@gmail.com");
            mailMessage.To.Add("su8hash@gmail.com");
            mailMessage.Body = "body";
            mailMessage.Subject = "subject";
            client.Send(mailMessage);
        }
    }
}
