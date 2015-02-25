using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace Lind.WPFTest.Data
{
    public interface IRepository
    {
        Task DeleteEntity(int id);
    }
    public interface IORepository<out TEntity> : IRepository
        where TEntity : class
    {
        IEnumerable<TEntity> GetEntities();
        TEntity GetEntity(int id);
    }
    public interface IIRepository<in TEntity> : IRepository
        where TEntity : class
    {
        Task SaveEntity(TEntity entity);
        Task AddEntity(TEntity entity);
    }
    public interface IRepository<TEntity> : IIRepository<TEntity>, IORepository<TEntity>
        where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetEntitiesAsync(CancellationToken token);
        Task<TEntity> GetEntityAsync(int id, CancellationToken token);
    }
}
