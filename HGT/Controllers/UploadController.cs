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
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using Amazon.Runtime;
using Microsoft.AspNetCore.Http;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HGT.Controllers
{
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        private const string bucketName = "hgtdata";
        private string publicadress = "https://s3.ap-south-1.amazonaws.com/hgtdata/user1/SampleVideo_1280x720_30mb.mp4";
        // Specify your bucket region (an example region is shown).
        private static readonly RegionEndpoint bucketRegion = RegionEndpoint.APSoutheast1;
        private IAmazonS3 s3Client;
        private IConfiguration Configuration { get; }


        private IServiceProvider services { get; }
        private readonly IHostingEnvironment hostingEnvironment;
        public UploadController(IAmazonS3 s3Client,IServiceProvider services, IHostingEnvironment hostingEnvironment, IConfiguration configuration)
        {
            this.s3Client = s3Client;
            this.services = services;
            Configuration = configuration;
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("[action]")]
        // [Authorize]
        [RequestSizeLimit(1073741823)]
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

                        // Very immportant to check format here other anyone will upload anything

                        var uniqueID = CreateUniqueVideoID();

                        var fileAddress = $"{user.Id}_{ uniqueID}{ext}";

                        VideoInfo videoInfo = new VideoInfo
                        {
                            FolderName = user.Id,
                            FileName = $"https://s3.ap-south-1.amazonaws.com/{bucketName}/{fileAddress}",
                            UploadDateTime = DateTime.Now,
                            Title = fileInfo.Title,
                            Description = fileInfo.Description,
                            Category = fileInfo.Category,
                            Format = ext,
                            HGTUserID = user.Id
                        };



                        UploadFileAsync(fileInfo.File, fileAddress).Wait();

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

        private  async Task UploadFileAsync(IFormFile file,string keyName)
        {

            //var imgbyts = Convert.FromBase64String(s);
            //var path = Environment.CurrentDirectory + "/1.png";
            //using (var t = new MemoryStream(imgbyts))
            //{
            //    FileStream fileStream = File.Create(path, (int)t.Length);
            //    fileStream.WriteAsync(imgbyts, 0, (int)t.Length);
            //}

            try
            {
                var fileTransferUtility = new TransferUtility(this.s3Client);
           
                // Option 4. Specify advanced settings.
                var fileTransferUtilityRequest = new TransferUtilityUploadRequest
                {
                    BucketName = bucketName,
                    InputStream = file.OpenReadStream(),
                    StorageClass = S3StorageClass.Standard,
                    //PartSize = 6291456, // 6 MB.
                    Key = keyName,
                    CannedACL = S3CannedACL.PublicRead
                };


                await fileTransferUtility.UploadAsync(fileTransferUtilityRequest);
                Console.WriteLine("Upload 4 completed");
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
            }

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
