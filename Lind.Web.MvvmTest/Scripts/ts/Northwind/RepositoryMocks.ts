module Northwind.Repository.Mock {
    export class MockRepository<TEntity> implements IRepositoryGeneric<TEntity>{
        constructor(public ServiceLocation: string) { }
        Delete(id: number): Promise<boolean> {
            var d = defer<boolean>();
            d.resolve(null);
            return d.promise();
        }
        GetAll(): Promise<TEntity[]> {
            var d = defer<TEntity[]>();
            setTimeout(() => {
                $.ajax({
                    type: "GET",
                    url: this.ServiceLocation,
                    success: data => d.resolve(<TEntity[]>data),
                    error: err => d.resolve(null)
                });
            }, 1000);
            return d.promise();
        }
        Get(id: number): Promise<TEntity> {
            var d = defer<TEntity>();
            d.resolve(null);
            return d.promise();
        }
        Add(entity: TEntity): Promise<TEntity> {
            var d = defer<TEntity>();
            d.resolve(null);
            return d.promise();
        }
        Update(entity: TEntity): Promise<boolean> {
            var d = defer<boolean>();
            d.resolve(false);
            return d.promise();

        }
    }
}