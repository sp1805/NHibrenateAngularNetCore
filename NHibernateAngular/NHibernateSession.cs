using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using Microsoft.AspNetCore.Hosting;
using NHibernate;
using NHibernate.Cfg;

namespace NHibernateAngular
{
    public class NHibernateSession
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public NHibernateSession(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        public static ISession OpenSession()
        {
            var configuration = new NHibernate.Cfg.Configuration();
            var configurationPath = Path.Combine(@"C:\Users\prajapatis\source\repos\NHibernateAngular\NHibernateAngular\Models\hibernate.cfg.xml");
            configuration.Configure(configurationPath);
            var bookConfigurationFile = Path.Combine(@"C:\Users\prajapatis\source\repos\NHibernateAngular\NHibernateAngular\Mappings\Book.cfg.xml");
            configuration.AddFile(bookConfigurationFile);
            ISessionFactory sessionFactory = configuration.BuildSessionFactory();
            return sessionFactory.OpenSession();
        }
    }
}
