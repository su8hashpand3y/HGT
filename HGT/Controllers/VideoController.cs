﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HGT.Models;
using HGT.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HGT.Helper;
using Microsoft.AspNetCore.Authorization;

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
        public IActionResult Index(long skip,int take = 10)
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
                    UserId = user?.Id,
                    NumberOfLikes = video.Likes,
                    VideoId = video.ID
                });
            }

            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Like(long videoId)
        {
            var context = this.services.GetService(typeof(HGTDbContext)) as HGTDbContext;
            var likedVideo = context.Videos.FirstOrDefault(x => x.ID == videoId);
            if (likedVideo != null)
            {
                likedVideo.Likes++;
                var like = new Like { VideoId = videoId, UserId = HttpContext.GetUserID() };
                context.Likes.Add(like);
                context.SaveChanges();
                return Ok(like);
            }

            return BadRequest();
        }

        [HttpPost]
        [Authorize]
        public IActionResult Comment(long videoId,string commentText)
        {
            var context = this.services.GetService(typeof(HGTDbContext)) as HGTDbContext;
            var likedVideo = context.Videos.FirstOrDefault(x => x.ID == videoId);
            if (likedVideo != null)
            {
                likedVideo.Comments++;
                var comment = new Comment { VideoId = videoId, UserId = HttpContext.GetUserID(), CommentText = commentText };
                context.Comments.Add(comment);
                context.SaveChanges();
                return Ok(comment);
            }

            return BadRequest();
        }
    }
}
