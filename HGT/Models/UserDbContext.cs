using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HGT.Models
{
    public class HGTDbContext : IdentityDbContext<HGTUser>
    {
        public HGTDbContext(DbContextOptions<HGTDbContext> options) : base(options) { }

        public DbSet<HGTUser> HGTUsers { get; set; }
        public DbSet<VideoInfo> Videos { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}