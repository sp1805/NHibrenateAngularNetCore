using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NHibernateAngular.Models
{
    public class Book
    {
        public virtual long Id { get; set; }
        public virtual string Title { get; set; }
        public virtual string Author { get; set; }
        public virtual string Genre { get; set; }
    }
}
