using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NHibernateAngular.Models;
using NHibernate;

namespace NHibernateAngular.Controllers
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Book> Index()
        {
            List<Book> books = new List<Book>();

            using (ISession session = NHibernateSession.OpenSession())  // Open a session to conect to the database
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    books = session.Query<Book>().ToList(); //  Querying to get all the books
                    transaction.Commit();
                }
            }

            return books.AsEnumerable();
        }
    }
}