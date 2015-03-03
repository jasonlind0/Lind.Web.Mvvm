using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Microsoft.Practices.Unity;

namespace Lind.Web.MvvmTest
{
    public class UnityFilterProvider : ActionDescriptorFilterProvider, IFilterProvider, IDisposable
    {
        private IUnityContainer Container { get; set; }
        public UnityFilterProvider(IUnityContainer container)
        {
            this.Container = container;
        }
        IEnumerable<FilterInfo> IFilterProvider.GetFilters(HttpConfiguration configuration, HttpActionDescriptor actionDescriptor)
        {
            var filters = base.GetFilters(configuration, actionDescriptor);
            foreach (var filter in filters)
            {
                this.Container.BuildUp(filter.Instance.GetType(), filter.Instance);
            }
            var auth = this.Container.Resolve<RepositoryControllerAuthorizations>(actionDescriptor.ControllerDescriptor.ControllerName);
            if (auth != null)
            {
                List<FilterInfo> filterInfos = new List<FilterInfo>(filters);
                if (auth.ControllerFilter != null)
                    filterInfos.Add(new FilterInfo(auth.ControllerFilter, FilterScope.Controller));
                if (auth.GetFilter != null && (actionDescriptor.ActionName == "Get" || actionDescriptor.ActionName == "GetAll"))
                    filterInfos.Add(new FilterInfo(auth.GetFilter, FilterScope.Action));
                if (auth.DeleteFilter != null && actionDescriptor.ActionName == "Delete")
                    filterInfos.Add(new FilterInfo(auth.DeleteFilter, FilterScope.Action));
                if (auth.PostFilter != null && actionDescriptor.ActionName == "Post")
                    filterInfos.Add(new FilterInfo(auth.PostFilter, FilterScope.Action));
                if (auth.PutFilter != null && actionDescriptor.ActionName == "Put")
                    filterInfos.Add(new FilterInfo(auth.PutFilter, FilterScope.Action));
                return filterInfos;
            }
            return filters;
        }

        public void Dispose()
        {
            this.Container.Dispose();
        }
    }

    public class RepositoryControllerAuthorizations
    {
        public IFilter ControllerFilter { get; set; }
        public IFilter GetFilter { get; set; }
        public IFilter DeleteFilter { get; set; }
        public IFilter PostFilter { get; set; }
        public IFilter PutFilter { get; set; }
    }
}