using KnjiznicaAPP.Data;
using KnjiznicaAPP.Models;
using Microsoft.AspNetCore.Mvc;

namespace KnjiznicaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KnjigaController : ControllerBase
    {
        // dependency injection
        // 1. definirati privatno svojstvo
        private readonly EdunovaContext _context;

        // dependecy injection
        // 2. proslijediš instancu kroz konstruktor
        public KnjigaController(EdunovaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Knjige);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Knjige.Find(sifra));
        }



        [HttpPost]
        public IActionResult Post(Knjiga knjiga)
        {
            _context.Knjige.Add(knjiga);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, knjiga);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Knjiga knjiga)
        {
            var knjigaBaza = _context.Knjige.Find(sifra);
            if (knjigaBaza == null)
            {
                return BadRequest(new { poruka = "Neispravan podatak" });
            }

       

            // Ručno ažuriranje entiteta
            knjigaBaza.Naziv = knjiga.Naziv;
            knjigaBaza.Knjizevnavrsta = knjiga.Knjizevnavrsta;

            _context.Knjige.Update(knjigaBaza);
            _context.SaveChanges();
           

            return Ok(new { poruka = "Uspješno promjenjeno" });

        }



        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var knjigaBaza = _context.Knjige.Find(sifra);

            _context.Knjige.Remove(knjigaBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno obrisano" });

        }


    }
}