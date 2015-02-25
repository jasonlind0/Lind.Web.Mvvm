using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Threading;

namespace Lind.WPFTest.Data
{
    public class Repository<TEntity, TContext> : IRepository<TEntity>
        where TEntity : class
        where TContext : DbContext, new()
    {
        protected TContext OpenContext()
        {
            return new TContext();
        }
        public virtual IEnumerable<TEntity> GetEntities()
        {
            using (var context = new TContext())
            {
                return context.Set<TEntity>().AsNoTracking().ToArray();
            }
        }

        public virtual async Task SaveEntity(TEntity entity)
        {
            using (var context = new TContext())
            {
                context.Set<TEntity>().Attach(entity);
                context.Entry(entity).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
        }

        public virtual async Task AddEntity(TEntity entity)
        {
            using (var context = new TContext())
            {
                context.Set<TEntity>().Add(entity);
                await context.SaveChangesAsync();
            }
        }

        public virtual async Task DeleteEntity(int id)
        {
            using (var context = new TContext())
            {
                var set = context.Set<TEntity>();
                set.Remove(set.Find(id));
                await context.SaveChangesAsync();
            }
        }

        public virtual TEntity GetEntity(int id)
        {
            using (var context = new TContext())
            {
                return context.Set<TEntity>().Find(id);
            }
        }

        public virtual async Task<IEnumerable<TEntity>> GetEntitiesAsync(CancellationToken token)
        {
            using (var context = new TContext())
            {
                return await context.Set<TEntity>().AsNoTracking().ToArrayAsync(token);
            }
        }

        public virtual async Task<TEntity> GetEntityAsync(int id, CancellationToken token)
        {
            using (var context = new TContext())
            {
                return await context.Set<TEntity>().FindAsync(token, id);
            }
        }
    }
    public class NorthwindRepository<TEntity> : Repository<TEntity, NorthwindContext> where TEntity : class { }
}
