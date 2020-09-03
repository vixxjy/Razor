using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using buklish.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace buklish.Controllers
{
    [Route("api/Book")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly ApplicationDbContext _db;

        public BookController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task <IActionResult> GetAll()
        {
            //var data = new { data = await _db.Book.ToList() };
            return Json(new { data = await _db.Book.ToListAsync() });
        }
        [HttpDelete]
        public  async Task<IActionResult> Delete(int id)
        {
            var BookFromDb = await _db.Book.FirstOrDefaultAsync(u => u.Id == id);
            if(BookFromDb == null)
            {
                return Json(new { success = false, message = "Error While Deleting" });
            }
            _db.Book.Remove(BookFromDb);
            await _db.SaveChangesAsync();
            return Json(new { success = true, message = "Deleted Successfully" });
        }
    }
}
