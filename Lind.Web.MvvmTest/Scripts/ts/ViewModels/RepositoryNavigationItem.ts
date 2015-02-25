/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../Promise.ts" />
module ViewModels.Repository {
    export var defer = P.defer;
    export var when = P.when;
    export interface Promise<Value> extends P.Promise<Value> { }
    export class RepositoryNavigationItem<TViewModel, TEntity> extends ViewModels.Navigation.NavigationItemCollection<TViewModel>{
        constructor(data: ViewModels.Navigation.INavigationData, public Repository: Northwind.Repository.IRepositoryGeneric<TEntity>) {
            super(data);
        }
        getItems(): Promise<TViewModel[]> {
            var d = defer<TViewModel[]>();
            this.Repository.GetAll().done(i => {
                var vms: TViewModel[] = [];
                if (i != null) {
                    for (var k: number = 0; k < i.length; k++) {
                        vms.push(this.createViewModel(i[k]));
                    }
                }
                d.resolve(vms);
            });
            return d.promise();
        }
        createViewModel(entity : TEntity): TViewModel {
            return null;
        }
    }
    export class ProductsNavigationItem extends RepositoryNavigationItem<Northwind.Product, Northwind.IProduct>{
        createViewModel(entity: Northwind.IProduct): Northwind.Product {
            return Northwind.Product.Create(entity);
        }
    }
    export class SuppliersNavigationItem extends RepositoryNavigationItem<Northwind.Supplier, Northwind.ISupplier>{
        createViewModel(entity: Northwind.ISupplier): Northwind.Supplier {
            return Northwind.Supplier.Create(entity);
        }
    }
}