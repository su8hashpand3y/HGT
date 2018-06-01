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
            string userEmail = HttpContext.GetUserEmail();
            if (!String.IsNullOrEmpty(userEmail))
            {
                try
                {
                    var context = this.services.GetService(typeof(HGTDbContext)) as HGTDbContext;

                    var user = context.HGTUsers.FirstOrDefault(x => x.Email == userEmail);
                    if (user != null)
                    {
                        long size = fileInfo.File.Length;
                        String ext = System.IO.Path.GetExtension(fileInfo.File.FileName);

                        string userDirectoryPath = Path.Combine(this.hostingEnvironment.WebRootPath,"Media", user.Id);

                        if (!Directory.Exists(userDirectoryPath))
                            Directory.CreateDirectory(userDirectoryPath);
                        // Very immportant to check format here other anyone will upload anything

                        var uniqueID = CreateUniqueVideoID();
                        var filePath = Path.Combine(userDirectoryPath, uniqueID + ext);
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await fileInfo.File.CopyToAsync(stream);
                        }
                        

                        VideoInfo videoInfo = new VideoInfo
                        {
                            FolderName = user.Id,
                            FileName = uniqueID,
                            UploadDateTime = DateTime.Now,
                            Title = fileInfo.Title,
                            Description = fileInfo.Description,
                            Category = fileInfo.Category,
                            Format = ext,
                            HGTUserID = user.Id
                        };

                        context.Videos.Add(videoInfo);
                        context.SaveChanges();
                    }
                }
                catch
                {
                }
            }




            // var converter = new FFMpegConverter();
            // converter.ConvertMedia(filePath, filePath + "new", "mp4");
            return Ok(new { Message = "you Are successfully Logged in" });
        }

        private string CreateUniqueVideoID()
        {
            return DateTime.Now.Year.ToString()
                + DateTime.Now.Month
                + DateTime.Now.Day
                + DateTime.Now.Hour
                + DateTime.Now.Minute
                + DateTime.Now.Second;
        }
    }
}
