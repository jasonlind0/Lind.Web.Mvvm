using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Threading;

namespace Lind.WPFTest.Data
{
    public class ProductRepository : NorthwindRepository<Product>
    {
        public override IEnumerable<Product> GetEntities()
        {
            using (var context = OpenContext())
            {
                return context.Products.AsNoTracking().Include(p => p.Supplier).Include(p => p.Category).Include(p => p.Order_Details).ToArray();
            }
            
        }
        public override Product GetEntity(int id)
        {
            using (var context = OpenContext())
            {
                return context.Products.AsNoTracking().Include(p => p.Supplier).Include(p => p.Category).Include(p => p.Order_Details).SingleOrDefault(p => p.ProductID == id);
            }
        }
        public override async Task<IEnumerable<Product>> GetEntitiesAsync(CancellationToken token)
        {
            using (var context = OpenContext())
            {
                return await context.Products.AsNoTracking().Include(p => p.Supplier).Include(p => p.Category).Include(p => p.Order_Details).ToArrayAsync(token);
            }
        }
        public override async Task<Product> GetEntityAsync(int id, CancellationToken token)
        {
            using (var context = OpenContext())
            {
                return await context.Products.AsNoTracking().Include(p => p.Supplier).Include(p => p.Category).Include(p => p.Order_Details).SingleOrDefaultAsync(p => p.ProductID == id);
            }
        }
    }
}
