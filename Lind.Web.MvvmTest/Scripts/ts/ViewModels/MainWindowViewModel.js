var ViewModels;
(function (ViewModels) {
    /// <reference path="../../typings/knockout/knockout.d.ts" />
    (function (MainWindow) {
        var MainWindowViewModel = (function () {
            function MainWindowViewModel(Container, navigationData) {
                var _this = this;
                this.Container = Container;
                this.navigationItems = ko.observableArray();
                this.selectedNavigationItem = ko.observable();
                this.selectedNavigationItemType = ko.computed(function () {
                    var navItem = _this.selectedNavigationItem();
                    if (navItem != null)
                        return navItem.data().Name;
                    return "Loading";
                });
                this.selectedNavigationItem.subscribe(function (n) {
                    if (n != null)
                        n.unload();
                }, this, "beforeChange");
                this.selectedNavigationItem.subscribe(function (n) {
                    if (n != null)
                        n.load();
                });
                for (var i = 0; i < navigationData.length; i++) {
                    var navItem = Container.Resolve(typeof ViewModels.Navigation.NavigationItem, navigationData[i].Name, [new Lind.IoC.ConstructorParameterFactory("data", function () {
                            return navigationData[i];
                        })]);
                    navItem.closed.add(this.onNavigationItemClosed);
                    navItem.navigationItemAdded.add(this.onNavigationItemAdded);
                    this.navigationItems.push(navItem);
                }
                this.selectedNavigationItem(this.navigationItems.peek()[0]);
            }
            MainWindowViewModel.prototype.onNavigationItemClosed = function (item) {
                item.closed.remove(this.onNavigationItemClosed);
                item.navigationItemAdded.remove(this.onNavigationItemAdded);
                this.navigationItems.remove(item);
                if (this.selectedNavigationItem() == item)
                    this.selectedNavigationItem(this.navigationItems.peek()[0]);
            };
            MainWindowViewModel.prototype.onNavigationItemAdded = function (item) {
                item.navigationItemAdded.add(this.onNavigationItemAdded);
                item.closed.add(this.onNavigationItemClosed);
                this.navigationItems.push(item);
                this.selectedNavigationItem(item);
            };
            return MainWindowViewModel;
        })();
        MainWindow.MainWindowViewModel = MainWindowViewModel;
    })(ViewModels.MainWindow || (ViewModels.MainWindow = {}));
    var MainWindow = ViewModels.MainWindow;
})(ViewModels || (ViewModels = {}));
