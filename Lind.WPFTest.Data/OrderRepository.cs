using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Threading;

namespace Lind.WPFTest.Data
{
    public class OrderRepository : NorthwindRepository<Order>
    {
        public override IEnumerable<Order> GetEntities()
        {
            using (var context = OpenContext())
            {
                return context.Orders.AsNoTracking().Include(o => o.Customer).Include(o => o.Employee).Include(o => o.Order_Details).Include("Order_Details.Product").ToArray();
                
            }
        }
        public override Order GetEntity(int id)
        {
            using (var context = OpenContext())
            {
                return context.Orders.AsNoTracking().Include(o => o.Customer).Include(o => o.Employee).Include(o => o.Order_Details).Include("Order_Details.Product").SingleOrDefault(o => o.OrderID == id);
            }
        }
        public override async Task<IEnumerable<Order>> GetEntitiesAsync(CancellationToken token)
        {
            using (var context = OpenContext())
            {
                return await context.Orders.AsNoTracking().Include(o => o.Customer).Include(o => o.Employee).Include(o => o.Order_Details).Include("Order_Details.Product").ToArrayAsync(token);
            }
        }
        public override async Task<Order> GetEntityAsync(int id, CancellationToken token)
        {
            using (var context = OpenContext())
            {
                return await context.Orders.AsNoTracking().Include(o => o.Customer).Include(o => o.Employee).Include(o => o.Order_Details).Include("Order_Details.Product").SingleOrDefaultAsync(o => o.OrderID == id, token);
            }
        }
    }
}
