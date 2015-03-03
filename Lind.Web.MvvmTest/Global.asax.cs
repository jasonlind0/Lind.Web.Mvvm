using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Microsoft.Practices.Unity;
using Lind.Web.MvvmTest.Controllers;
using Lind.WPFTest.Data;
using System.Web.Http.Dispatcher;
using System.Web.Http.Filters;
using AA = System.Web.Http.AuthorizeAttribute;

namespace Lind.Web.MvvmTest
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            UnityContainer container = new UnityContainer();
            container.RegisterType<IRepository<Product>, ProductRepository>();
            container.RegisterType<IRepository<Supplier>, NorthwindRepository<Supplier>>();
            container.RegisterType<IRepository<Employee>, NorthwindRepository<Employee>>();
            container.RegisterType<IRepository<Shipper>, NorthwindRepository<Shipper>>();
            container.RegisterType<IRepository<Order>, OrderRepository>();
            container.RegisterType<IRepository<Customer>, NorthwindRepository<Customer>>();
            RepositoryControllerRegistery<Product>.Register(container, RouteTable.Routes);
            RepositoryControllerRegistery<Supplier>.Register(container, RouteTable.Routes, controllerFilter: new AA());
            RepositoryControllerRegistery<Employee>.Register(container, RouteTable.Routes);
            RepositoryControllerRegistery<Shipper>.Register(container, RouteTable.Routes);
            RepositoryControllerRegistery<Order>.Register(container, RouteTable.Routes);
            RepositoryControllerRegistery<Customer>.Register(container, RouteTable.Routes);
            AreaRegistration.RegisterAllAreas();
            
            GlobalConfiguration.Configuration.MapHttpAttributeRoutes();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityResolver(container);
            GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerSelector), new UnityControllerSelector(GlobalConfiguration.Configuration, container));
            var providers = GlobalConfiguration.Configuration.Services.GetFilterProviders();
            var defaultProvider = providers.Single(i => i is ActionDescriptorFilterProvider);
            GlobalConfiguration.Configuration.Services.Remove(typeof(System.Web.Http.Filters.IFilterProvider), defaultProvider);
            GlobalConfiguration.Configuration.Services.Add(typeof(System.Web.Http.Filters.IFilterProvider), new UnityFilterProvider(container));
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteTable.Routes.MapMvcAttributeRoutes();
            
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Clear();
        }
    }
}