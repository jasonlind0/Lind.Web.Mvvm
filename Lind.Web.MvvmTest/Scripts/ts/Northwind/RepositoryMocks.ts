module Northwind.Repository.Mock {
    export class MockRepository<TEntity> implements IRepositoryGeneric<TEntity>{
        constructor(public ServiceLocation: string) { }
        Delete(id: number): JQueryPromise<boolean> {
            var d = $.Deferred<boolean>();
            d.resolve(null);
            return d.promise();
        }
        GetAll(): JQueryPromise<TEntity[]> {
            var d = $.Deferred<TEntity[]>();
            setTimeout(() => {
                d.resolve(null);
            }, 5000);
            return d.promise();
        }
        Get(id: number): JQueryPromise<TEntity> {
            var d = $.Deferred<TEntity>();
            d.resolve(null);
            return d.promise();
        }
        Add(entity: TEntity): JQueryPromise<TEntity> {
            var d = $.Deferred<TEntity>();
            d.resolve(null);
            return d.promise();
        }
        Update(entity: TEntity): JQueryPromise<boolean> {
            var d = $.Deferred<boolean>();
            d.resolve(false);
            return d.promise();

        }
    }
}