using Microsoft.EntityFrameworkCore;
using ProductApi.Model.Entities;

namespace ProductApi.Model.DatabaseContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        public DbSet<Product> Products { get; set; }
    }
}
