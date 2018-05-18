using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HGT.Helper
{
    public static class AuthorizationHelper
    {
        public static string GetUserEmail(this HttpContext httpContext)
        {
            string authHeader = httpContext.Request.Headers["Authorization"];
            if (!string.IsNullOrEmpty(authHeader))
            {
                string[] authHeaderParts = authHeader.Split(' ');
                if (authHeaderParts?.Length == 2 && authHeaderParts[0].Equals("Bearer", StringComparison.InvariantCultureIgnoreCase))
                {
                    var jwtHandler = new JwtSecurityTokenHandler();
                    if (jwtHandler.CanReadToken(authHeaderParts[1]))
                    {
                        var jwtToken = jwtHandler.ReadJwtToken(authHeaderParts[1]);
                        var userIDToken = jwtToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name);
                        if (userIDToken != null)
                        {
                            return userIDToken.Value;
                        }
                    }
                }
            }

            return null;
        }
    }
}
