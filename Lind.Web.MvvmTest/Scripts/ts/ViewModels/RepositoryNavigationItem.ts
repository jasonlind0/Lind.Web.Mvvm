/// <reference path="../../typings/knockout/knockout.d.ts" />
module ViewModels.Repository {
    export class RepositoryNavigationItem<TViewModel, TEntity> extends ViewModels.Navigation.NavigationItemCollection<TViewModel>{
        constructor(data: ViewModels.Navigation.INavigationData, public Repository: Northwind.Repository.IRepositoryGeneric<TEntity>) {
            super(data);
        }
        getItems(): JQueryPromise<TViewModel[]> {
            return this.Repository.GetAll().then(i => {
                var vms: TViewModel[] = [];
                if (i != null) {
                    for (var k: number = 0; k < i.length; k++) {
                        vms.push(this.createViewModel(i[k]));
                    }
                }
                return vms;
            }, () => null);
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