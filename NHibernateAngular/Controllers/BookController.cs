using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NHibernateAngular.Domain;
using NHibernate;
using Microsoft.AspNetCore.Http;

using System.Web.Http;


namespace NHibernateAngular.Controllers
{
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        [HttpGet("[action]")]
        public IEnumerable<Book> Index()
        {
            List<Book> books = new List<Book>();

            using (NHibernate.ISession session = NHibernateSession.OpenSession())  // Open a session to conect to the database
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    books = session.Query<Book>().ToList(); //  Querying to get all the books
                    transaction.Commit();
                }
            }

            return books.AsEnumerable();

        }

        [HttpGet("[action]/{id}")]
        public Book GetBook(int id)
        {
            Book book = new Book();
            using (NHibernate.ISession session = NHibernateSession.OpenSession())
            {
                book = session.Query<Book>().Where(b => b.Id == id).FirstOrDefault();
            }
            return book;
        }
        [HttpPut("[action]/{id}")]
        public void Edit([FromBody]  Book book)
        {
            if (ModelState.IsValid)
            {
                using (NHibernate.ISession session = NHibernateSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        session.SaveOrUpdate(book);
                        transaction.Commit();
                    }
                }
            }
        }

        [HttpPost("[action]")]
        public void Create([FromBody]  Book book)
        {
            if (ModelState.IsValid)
            {
                using (NHibernate.ISession session = NHibernateSession.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        session.Save(book);
                        transaction.Commit();
                    }
                }
            }
        }

        [HttpPost("[action]")]
        public void DeleteBook([FromBody] int? id)
        {
            if (id != null)
            {
                using (NHibernate.ISession session = NHibernateSession.OpenSession())
                {
                    Book book = session.Get<Book>(id);

                    using (ITransaction trans = session.BeginTransaction())
                    {
                        session.Delete(book);
                        trans.Commit();

                    }
                }
            }
        }


    }
}