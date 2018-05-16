using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HGT.Models
{
    public class UserDbContext : IdentityDbContext<HGTUser>
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }
    }
}