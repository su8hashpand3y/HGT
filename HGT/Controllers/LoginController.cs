using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using HashLibrary;
using HGT.ViewModels;
using HGT.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using HGT.Helper;
using NReco.VideoConverter;

namespace HGT.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private IConfiguration Configuration { get; }
        private IServiceProvider services { get; }

        public LoginController(IConfiguration configuration, IServiceProvider services)
        {
            Configuration = configuration;
            this.services = services;
        }

        [Authorize]
        [HttpGet("[action]")]
        public  IActionResult GetSecret()
        {
            return Ok(new { Message = "you Are successfully Logged in" });
        }



        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody]RegisterViewModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var context = this.services.GetService(typeof(HGTDbContext)) as HGTDbContext;
                    if (context.HGTUsers.FirstOrDefault(x => x.Email == model.Email) == null)
                    {
                        var hasher = new Hasher();
                        var hashedPassword = hasher.HashPassword(model.Password);
                        HGTUser newUser = new HGTUser
                        {
                            FirstName = model.FirstName,
                            LastName = model.LastName,
                            Email = model.Email,
                            PasswordHash = hashedPassword.Hash,
                            Salt = hashedPassword.Salt,
                            Gender = model.Gender,
                            District = model.District,
                            Town = model.Town,
                            Age = model.Age,
                            AvatarImage= model.AvatarImage
                        };
                        context.HGTUsers.Add(newUser);
                        context.SaveChanges();
                        // Send the verification Mail
                        return Ok("User Registration successful :) \n Please Verify your email we have sent you a link." );
                    }
                }
                catch 
                {
                    return BadRequest("Oops, Something went wrong :(");
                }
            }
            else
            {
                var modelErrors = new StringBuilder();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        modelErrors.AppendLine(modelError.ErrorMessage);
                    }
                }

                return BadRequest(modelErrors.ToString());
            }

            return BadRequest("Oops, Somthing went wrong  :(");
        }


        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Login([FromBody]LoginViewModel user, string returnUrl = null)
        {

            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                bool succeeded = false;
                var context = this.services.GetService(typeof(HGTDbContext)) as HGTDbContext;
                var foundUser = context.HGTUsers.FirstOrDefault(x => x.Email == user.Email);
                if (foundUser == null)
                    return Ok(new { Message = "User not found" });

                if (!foundUser.IsVerified)
                {
                    // Send The verification Mail
                }

                var hash = new HashedPassword(foundUser.PasswordHash, foundUser.Salt);
                var hasher = new Hasher();
                if (hasher.Check(user.Password, hash))
                    succeeded = true;
                else return Ok(new { Message = "Wrong Password" });
                // Check whether Such user Exists in Database or not 
                if (succeeded)
                {
                    var claims = new[]
                    {
                              new Claim(ClaimTypes.Email, user.Email),
                              new Claim(ClaimTypes.NameIdentifier, foundUser.Id)
                        };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["SecurityKey"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            issuer: Configuration["ValidIssuer"],
                            audience: Configuration["ValidAudience"],
                            claims: claims,
                            expires: DateTime.Now.AddMinutes(30),
                            signingCredentials: creds);

                        return new JsonResult(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token)
                        });

                  
                }
                else
                {
                    return BadRequest("Could not verify username and password");
                }
            }

            // If we got this far, something failed, redisplay form
            //  return View(model);
            return BadRequest("Could not verify username and password");
        }


        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }
    }
}
