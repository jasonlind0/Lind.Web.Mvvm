using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dependencies;
using Microsoft.Practices.Unity;
using System.Web.Http.Dispatcher;
using System.Web.Http.Controllers;

namespace Lind.Web.MvvmTest
{
    public class UnityResolver : IDependencyResolver
    {
        private IUnityContainer Container { get; set; }
        public UnityResolver(IUnityContainer container)
        {
            this.Container = container;
        }

        public IDependencyScope BeginScope()
        {
            var child = this.Container.CreateChildContainer();
            return new UnityResolver(child);
        }

        public object GetService(Type serviceType)
        {
            try
            {
                return Container.Resolve(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return null;
            }
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return this.Container.ResolveAll(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return new object[] { };
            }
        }

        public void Dispose()
        {
            this.Container.Dispose();
        }
    }

    public class UnityControllerSelector : DefaultHttpControllerSelector
    {
        private IUnityContainer Container { get; set; }
        private HttpConfiguration Configuration { get; set; }
        public UnityControllerSelector(HttpConfiguration configuration, IUnityContainer container) :base(configuration)
        {
            this.Container = container;
            this.Configuration = configuration;
        }

        public override HttpControllerDescriptor SelectController(System.Net.Http.HttpRequestMessage request)
        {
            var controllerName = base.GetControllerName(request);
            var controller = Container.Resolve<IHttpController>(controllerName);
            if(controller != null)
                return new HttpControllerDescriptor(this.Configuration, controllerName, controller.GetType());
            return base.SelectController(request);
        }
    }
}