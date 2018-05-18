using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HGT.Helper;
using HGT.Models;
using HGT.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HGT.Controllers
{
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        private IServiceProvider services { get; }
        private readonly IHostingEnvironment hostingEnvironment;
        public UploadController(IServiceProvider services, IHostingEnvironment hostingEnvironment)
        {
            this.services = services;
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<IActionResult> Upload(UploadInfoViewModel fileInfo)
        {
            string userId = HttpContext.GetUserEmail();
            if (!String.IsNullOrEmpty(userId))
            {
                long size = fileInfo.File.Length;

               
                string userDirectoryPath = Path.Combine(this.hostingEnvironment.WebRootPath, userId);

                if (!Directory.Exists(userDirectoryPath))
                    Directory.CreateDirectory(userDirectoryPath);

                var filePath = Path.Combine(userDirectoryPath, "newaa.mp4");
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await fileInfo.File.CopyToAsync(stream);
                }
            }

            var context = this.services.GetService(typeof(HGTDbContext)) as HGTDbContext;


            // var converter = new FFMpegConverter();
            // converter.ConvertMedia(filePath, filePath + "new", "mp4");
            return Ok(new { Message = "you Are successfully Logged in" });
        }

    }
}
