using KnjiznicaAPP.Models;
using Microsoft.EntityFrameworkCore;

namespace KnjiznicaAPP.Data
{

    public class EdunovaContext : DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> opcije) : base(opcije)
        {

        }


        public DbSet<Knjiga> Knjige { get; set; }


    }
}