var Views;
(function (Views) {
    (function (Main) {
        /// <reference path="../../typings/knockout/knockout.d.ts" />
        /// <reference path="../../typings/jquery/jquery.d.ts" />
        var MainWindowView = (function () {
            function MainWindowView(ServiceLocationBase) {
                var _this = this;
                this.ServiceLocationBase = ServiceLocationBase;
                var container = new Lind.IoC.Container();
                container.Register("ProductRepository", (function (arguments) {
                    return new Northwind.Repository.Repository(arguments[0]);
                }), null, [new Lind.IoC.ConstructorParameterFactory("ServiceLocation", function () {
                        return _this.ServiceLocationBase + "Products/";
                    })]);
                container.Register("SupplierRepository", (function (arguments) {
                    return new Northwind.Repository.Repository(arguments[0]);
                }), null, [new Lind.IoC.ConstructorParameterFactory("ServiceLocation", function () {
                        return _this.ServiceLocationBase + "Suppliers/";
                    })]);

                container.Register(typeof ViewModels.Navigation.NavigationItem, function (arguments) {
                    return new ViewModels.Repository.ProductsNavigationItem(arguments[0], arguments[1]);
                }, "Products", [
                    new Lind.IoC.DefaultConstructorFactory("data"),
                    new Lind.IoC.TypedConstructorFactory("repository", "ProductRepository", container)
                ]);
                container.Register(typeof ViewModels.Navigation.NavigationItem, function (arguments) {
                    return new ViewModels.Repository.SuppliersNavigationItem(arguments[0], arguments[1]);
                }, "Suppliers", [
                    new Lind.IoC.DefaultConstructorFactory("data"),
                    new Lind.IoC.TypedConstructorFactory("repository", "SupplierRepository", container)
                ]);
                ViewModels.Navigation.NavigationItemFactory.Initalize(function (data) {
                    return container.Resolve(typeof ViewModels.Navigation.NavigationItem, data.Name, [new Lind.IoC.ConstructorParameterFactory("data", function () {
                            return data;
                        })]);
                });
                this.ViewModel = new ViewModels.MainWindow.MainWindowViewModel([this.createNavigationData("Products"), this.createNavigationData("Suppliers")]);
                ko.applyBindings(this.ViewModel);
            }
            MainWindowView.prototype.createNavigationData = function (name, displayName) {
                if (displayName == null)
                    displayName = name;
                return new ViewModels.Navigation.NavigationData(name, displayName, false);
            };
            return MainWindowView;
        })();
        Main.MainWindowView = MainWindowView;
    })(Views.Main || (Views.Main = {}));
    var Main = Views.Main;
})(Views || (Views = {}));
