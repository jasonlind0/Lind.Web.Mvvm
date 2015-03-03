using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Lind.WPFTest.Data;
using System.Threading.Tasks;
using System.Threading;
using System.Web.Routing;
using Inflector;
using System.Reflection;
using Microsoft.Practices.Unity;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Lind.Web.MvvmTest.Controllers
{
    public static class RepositoryControllerRegistery<TEntity>
        where TEntity: class
    {
        public static void Register<TRepositoryController>(IUnityContainer container, RouteCollection routes, string name = null, string path = "api", IFilter controllerFilter = null,
            IFilter getFilter = null, IFilter deleteFilter = null, IFilter putFilter = null, IFilter postFilter = null)
            where TRepositoryController : IRepositoryController<TEntity>
        {
            if(name == null)
                name = typeof(TEntity).Name.Pluralize();
            container.RegisterType<IHttpController, TRepositoryController>(name);
            RepositoryControllerAuthorizations auth = new RepositoryControllerAuthorizations()
            {
                ControllerFilter = controllerFilter,
                GetFilter = getFilter,
                DeleteFilter = deleteFilter,
                PutFilter = putFilter,
                PostFilter = postFilter
            };
            container.RegisterInstance<RepositoryControllerAuthorizations>(name, auth);
            routes.MapHttpRoute(string.Format("{0}GetAll", name), string.Format("{0}/{1}/GetAll", path, name), new { controller = name, action = "GetAll" });
            routes.MapHttpRoute(string.Format("{0}Get", name), string.Format("{0}/{1}/Get/{2}", path, name, "{id}"), new { controller = name, action = "Get" });
            routes.MapHttpRoute(string.Format("{0}Delete", name), string.Format("{0}/{1}/Delete/{2}", path, name, "{id}"), new { controller = name, action = "Delete" });
            routes.MapHttpRoute(string.Format("{0}Post", name), string.Format("{0}/{1}/Post", path, name), new { controller = name, action = "Post" });
            routes.MapHttpRoute(string.Format("{0}Put", name), string.Format("{0}/{1}/Put", path, name), new { controller = name, action = "Put" });
        }
        public static void Register(IUnityContainer container, RouteCollection routes, string name = null, string path = "api", IFilter controllerFilter = null,
            IFilter getFilter = null, IFilter deleteFilter = null, IFilter putFilter = null, IFilter postFilter = null)
        {
            Register<RepositoryController<TEntity>>(container, routes, name, path, controllerFilter, getFilter, deleteFilter, putFilter, postFilter);
        }
    }
    public interface IRepositoryController : IHttpController
    {
        Task<HttpResponseMessage> GetAll();
        Task<HttpResponseMessage> Get(int id);
        Task<HttpResponseMessage> Delete(int id);
    }
    public interface IRepositoryController<in TEntity> : IRepositoryController
        where TEntity : class
    {
        Task<HttpResponseMessage> Put(TEntity entity);
        Task<HttpResponseMessage> Post(TEntity entity);
    }
    public class RepositoryController<TEntity> : RepositoryController<TEntity, IRepository<TEntity>>
        where TEntity : class
    {
        public RepositoryController(IRepository<TEntity> repository) : base(repository) { }
    }
    public class RepositoryController<TEntity, TRepository> : ApiController, IRepositoryController<TEntity>
        where TEntity : class
        where TRepository : IRepository<TEntity>
    {
        protected TRepository Repository { get; private set; }
        public RepositoryController(TRepository repository)
        {
            this.Repository = repository;
        }

        [HttpGet]
        public async virtual Task<HttpResponseMessage> GetAll()
        {
            try
            {
                CancellationTokenSource cancel = new CancellationTokenSource();
                var entities = await this.Repository.GetEntitiesAsync(cancel.Token);
                return Request.CreateResponse<IEnumerable<TEntity>>(entities);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        public virtual async Task<HttpResponseMessage> Get(int id)
        {
            try
            {
                CancellationTokenSource cancel = new CancellationTokenSource();
                var obj = await this.Repository.GetEntityAsync(id, cancel.Token);
                if (obj != null)
                    return Request.CreateResponse<TEntity>(obj);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Item not found");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpDelete]
        public virtual async Task<HttpResponseMessage> Delete(int id)
        {
            try
            {
                await this.Repository.DeleteEntity(id);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
            
        }
        [HttpPut]
        public virtual async Task<HttpResponseMessage> Put(TEntity entity)
        {
            try
            {
                await Repository.SaveEntity(entity);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        [HttpPost]
        public virtual async Task<HttpResponseMessage> Post(TEntity entity)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await Repository.AddEntity(entity);
                    return Request.CreateResponse<TEntity>(HttpStatusCode.Created, entity);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, "Invalid model state");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
    //public class CustomerController : NorthwindController<Customer>
    //{
    //    public CustomerController(IRepository<Customer> repository) : base(repository) { }
    //    public CustomerController() : base() { }
    //    [Route("api/Customers/GetAll")]
    //    public override Task<HttpResponseMessage> GetAll()
    //    {
    //        return base.GetAll();
    //    }
    //    [Route("api/Customers/Get/{id:int}")]
    //    public override Task<HttpResponseMessage> Get(int id)
    //    {
    //        return base.Get(id);
    //    }
    //    [Route("api/Customers/Delete/{id:int}")]
    //    public override Task<HttpResponseMessage> Delete(int id)
    //    {
    //        return base.Delete(id);
    //    }
    //    [Route("api/Customers/Post/")]
    //    public override Task<HttpResponseMessage> Post(Customer entity)
    //    {
    //        return base.Post(entity);
    //    }
    //    [Route("api/Customers/Put/")]
    //    public override Task<HttpResponseMessage> Put(Customer entity)
    //    {
    //        return base.Put(entity);
    //    }
    //}
    //public class EmployeeController : NorthwindController<Employee>
    //{
    //    public EmployeeController(IRepository<Employee> repository) : base(repository) { }
    //    public EmployeeController() : base() { }
    //    [Route("api/Employees/GetAll")]
    //    public override Task<HttpResponseMessage> GetAll()
    //    {
    //        return base.GetAll();
    //    }
    //    [Route("api/Employees/Get/{id:int}")]
    //    public override Task<HttpResponseMessage> Get(int id)
    //    {
    //        return base.Get(id);
    //    }
    //    [Route("api/Employees/Delete/{id:int}")]
    //    public override Task<HttpResponseMessage> Delete(int id)
    //    {
    //        return base.Delete(id);
    //    }
    //    [Route("api/Employees/Post/")]
    //    public override Task<HttpResponseMessage> Post(Employee entity)
    //    {
    //        return base.Post(entity);
    //    }
    //    [Route("api/Employees/Put/")]
    //    public override Task<HttpResponseMessage> Put(Employee entity)
    //    {
    //        return base.Put(entity);
    //    }
    //}
    //public class OrderController : NorthwindController<Order>
    //{
    //    public OrderController(IRepository<Order> repository) : base(repository) { }
    //    public OrderController() : base(new OrderRepository()) { }
    //    [Route("api/Orders/GetAll")]
    //    public override Task<HttpResponseMessage> GetAll()
    //    {
    //        return base.GetAll();
    //    }
    //    [Route("api/Orders/Get/{id:int}")]
    //    public override Task<HttpResponseMessage> Get(int id)
    //    {
    //        return base.Get(id);
    //    }
    //    [Route("api/Orders/Delete/{id:int}")]
    //    public override Task<HttpResponseMessage> Delete(int id)
    //    {
    //        return base.Delete(id);
    //    }
    //    [Route("api/Orders/Post/")]
    //    public override Task<HttpResponseMessage> Post(Order entity)
    //    {
    //        return base.Post(entity);
    //    }
    //    [Route("api/Orders/Put/")]
    //    public override Task<HttpResponseMessage> Put(Order entity)
    //    {
    //        return base.Put(entity);
    //    }
    //}
    //public class ProductController : NorthwindController<Product>
    //{
    //    public ProductController(IRepository<Product> repository) : base(repository) { }
    //    public ProductController() : base(new ProductRepository()) { }
    //    [Route("api/Products/GetAll")]
    //    public override Task<HttpResponseMessage> GetAll()
    //    {
    //        return base.GetAll();
    //    }
    //    [Route("api/Products/Get/{id:int}")]
    //    public override Task<HttpResponseMessage> Get(int id)
    //    {
    //        return base.Get(id);
    //    }
    //    [Route("api/Products/Delete/{id:int}")]
    //    public override Task<HttpResponseMessage> Delete(int id)
    //    {
    //        return base.Delete(id);
    //    }
    //    [Route("api/Products/Post/")]
    //    public override Task<HttpResponseMessage> Post(Product entity)
    //    {
    //        return base.Post(entity);
    //    }
    //    [Route("api/Products/Put/")]
    //    public override Task<HttpResponseMessage> Put(Product entity)
    //    {
    //        return base.Put(entity);
    //    }
    //}
    //public class ShipperController : NorthwindController<Shipper>
    //{
    //    public ShipperController(IRepository<Shipper> repository) : base(repository) { }
    //    public ShipperController() : base() { }
    //    [Route("api/Shippers/GetAll")]
    //    public override Task<HttpResponseMessage> GetAll()
    //    {
    //        return base.GetAll();
    //    }
    //    [Route("api/Shippers/Get/{id:int}")]
    //    public override Task<HttpResponseMessage> Get(int id)
    //    {
    //        return base.Get(id);
    //    }
    //    [Route("api/Shippers/Delete/{id:int}")]
    //    public override Task<HttpResponseMessage> Delete(int id)
    //    {
    //        return base.Delete(id);
    //    }
    //    [Route("api/Shippers/Post/")]
    //    public override Task<HttpResponseMessage> Post(Shipper entity)
    //    {
    //        return base.Post(entity);
    //    }
    //    [Route("api/Shippers/Put/")]
    //    public override Task<HttpResponseMessage> Put(Shipper entity)
    //    {
    //        return base.Put(entity);
    //    }
    //}
    //public class SupplierController : NorthwindController<Supplier>
    //{
    //    public SupplierController(IRepository<Supplier> repository) : base(repository) { }
    //    public SupplierController() : base() { }
    //    [Route("api/Suppliers/GetAll")]
    //    public override Task<HttpResponseMessage> GetAll()
    //    {
    //        return base.GetAll();
    //    }
    //    [Route("api/Suppliers/Get/{id:int}")]
    //    public override Task<HttpResponseMessage> Get(int id)
    //    {
    //        return base.Get(id);
    //    }
    //    [Route("api/Suppliers/Delete/{id:int}")]
    //    public override Task<HttpResponseMessage> Delete(int id)
    //    {
    //        return base.Delete(id);
    //    }
    //    [Route("api/Suppliers/Post/")]
    //    public override Task<HttpResponseMessage> Post(Supplier entity)
    //    {
    //        return base.Post(entity);
    //    }
    //    [Route("api/Suppliers/Put/")]
    //    public override Task<HttpResponseMessage> Put(Supplier entity)
    //    {
    //        return base.Put(entity);
    //    }
    //}
}
