using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HGT.Models;
using HGT.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HGT.Controllers
{
    public class VideoController : Controller
    {
        string Default_Poster = "/Media/Got_Talent_logo.jpg";
        private IServiceProvider services { get; }
        public VideoController(IServiceProvider services)
        {
            this.services = services;
        }
        // GET: /<controller>/ 
        // [HttpGet()]
        public IActionResult Index()
        {
            var result = new List<VideoViewModel>();
            var context = this.services.GetService(typeof(HGTDbContext)) as HGTDbContext;
           
            foreach (var video in context.Videos.Include(x=>x.HGTUser))
            {
                HGTUser user = video.HGTUser;
                result.Add(new VideoViewModel {
                    FolderName = video.FolderName,
                    FileName = video.FileName,
                    Poster = video.Poster ?? Default_Poster,
                    Format = video.Format,
                    Description = video.Description,
                    Title = video.Title,
                    UserFirstName = user?.FirstName,
                    UserDistrict = user?.District,
                    NumberOfLikes = video.Likes
                });
            }

            return Ok(result);
        }

       private HGTUser GetUserInfo(HGTDbContext dbContext, VideoInfo video) {
            return dbContext.HGTUsers.FirstOrDefault(x => x.Id == video.HGTUserID);
        }
    }
}
