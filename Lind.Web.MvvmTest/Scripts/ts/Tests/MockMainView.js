/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
var Tests;
(function (Tests) {
    var MainWindowView = (function () {
        function MainWindowView() {
            var container = new Lind.IoC.Container();
            container.Register(typeof ViewModels.Navigation.NavigationItem, function (arguments) {
                return new ViewModels.Repository.ProductsNavigationItem(arguments[0], arguments[1]);
            }, "Products", [
                new Lind.IoC.DefaultConstructorFactory("data"),
                new Lind.IoC.ConstructorParameterFactory("repository", function () {
                    return new Northwind.Repository.Mock.MockRepository("products");
                })
            ]);
            container.Register(typeof ViewModels.Navigation.NavigationItem, function (arguments) {
                return new ViewModels.Repository.SuppliersNavigationItem(arguments[0], arguments[1]);
            }, "Suppliers", [
                new Lind.IoC.DefaultConstructorFactory("data"),
                new Lind.IoC.ConstructorParameterFactory("repository", function () {
                    return new Northwind.Repository.Mock.MockRepository("suppliers");
                })
            ]);
            this.ViewModel = new ViewModels.MainWindow.MainWindowViewModel(container, [this.createNavigationData("Products"), this.createNavigationData("Suppliers")]);
            ko.applyBindings(this.ViewModel);
        }
        MainWindowView.prototype.createNavigationData = function (name, displayName) {
            if (displayName == null)
                displayName = name;
            return new ViewModels.Navigation.NavigationData(name, displayName, false);
        };
        return MainWindowView;
    })();
    Tests.MainWindowView = MainWindowView;
    $(function () {
        new MainWindowView();
    });
})(Tests || (Tests = {}));
