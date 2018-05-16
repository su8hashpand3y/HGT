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

namespace HGT.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private IConfiguration Configuration { get; }
        public SampleDataController(IConfiguration configuration)
        {
            Configuration = configuration;
        }



        [Authorize]
        [HttpGet("[action]")]
        public string GetSecret(string somePassword)
        {
            var hasher = new Hasher();
            string hashedPassword = string.Empty;
            // var v = new HashedPassword(
            // hasher.Check(somePassword, hashedPassword))

            return "SuperSecret";
        }



        // [HttpPost]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        [HttpPost("[action]")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model, string returnUrl = null)
        {
            var hasher = new Hasher();
            var hashedPassword = hasher.HashPassword(model.Password);
            




            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                var user = new HGTUser { UserName = model.Email, Email = model.Email };
                bool succeeded = false;
                // Save User To Database 
                if (succeeded)
                {
                    return RedirectToLocal(returnUrl);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }


        // [HttpPost]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        [HttpGet("[action]")]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {

            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                bool succeeded = false;
                // Check whether Such user Exists in Database or not 
                if (succeeded)
                {
                        var claims = new[]
                        {
                              new Claim(ClaimTypes.Name, model.Email)
                             };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["SecurityKey"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            issuer: Configuration["ValidIssuer"],
                            audience: Configuration["ValidAudience"],
                            claims: claims,
                            expires: DateTime.Now.AddMinutes(30),
                            signingCredentials: creds);

                        return Ok(new
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
