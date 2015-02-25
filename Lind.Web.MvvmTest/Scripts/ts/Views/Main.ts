module Views.Main {
    /// <reference path="../../typings/knockout/knockout.d.ts" />
    /// <reference path="../../typings/jquery/jquery.d.ts" />
    export class MainWindowView {
        constructor(public ServiceLocationBase: string) {
            var container = new Lind.IoC.Container();
            container.Register(typeof ViewModels.Navigation.NavigationItem,
                (arguments) => new ViewModels.Repository.ProductsNavigationItem(<ViewModels.Navigation.INavigationData>arguments[0],
                    <Northwind.Repository.IRepositoryGeneric<Northwind.IProduct>>arguments[1]),
                "Products",
                [
                    new Lind.IoC.DefaultConstructorFactory("data"),
                    new Lind.IoC.ConstructorParameterFactory("repository", () => new Northwind.Repository.Repository<Northwind.IProduct>(this.ServiceLocationBase + "Products/"))
                ]);
            container.Register(typeof ViewModels.Navigation.NavigationItem,
                (arguments) => new ViewModels.Repository.SuppliersNavigationItem(<ViewModels.Navigation.INavigationData>arguments[0],
                    <Northwind.Repository.IRepositoryGeneric<Northwind.ISupplier>>arguments[1]),
                "Suppliers",
                [
                    new Lind.IoC.DefaultConstructorFactory("data"),
                    new Lind.IoC.ConstructorParameterFactory("repository", () => new Northwind.Repository.Repository<Northwind.ISupplier>(this.ServiceLocationBase + "Suppliers/"))
                ]);
            this.ViewModel = new ViewModels.MainWindow.MainWindowViewModel(container, [this.createNavigationData("Products"), this.createNavigationData("Suppliers")]);
            ko.applyBindings(this.ViewModel);
        }
        private createNavigationData(name: string, displayName?: string) : ViewModels.Navigation.INavigationData {
            if (displayName == null)
                displayName = name;
            return new ViewModels.Navigation.NavigationData(name, displayName, false); 
        }
        public ViewModel: ViewModels.MainWindow.MainWindowViewModel;
    }
}