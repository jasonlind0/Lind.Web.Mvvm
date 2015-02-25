/// <reference path="../../typings/knockout/knockout.d.ts" />
module ViewModels.MainWindow {
    export class MainWindowViewModel {
        constructor(private Container: Lind.IoC.IContainer, navigationData: ViewModels.Navigation.INavigationData[]) {
            this.navigationItems = ko.observableArray<ViewModels.Navigation.NavigationItem>();
            this.selectedNavigationItem = ko.observable<ViewModels.Navigation.NavigationItem>();
            this.selectedNavigationItemType = ko.computed(() => {
                var navItem = this.selectedNavigationItem();
                if (navItem != null)
                    return navItem.data().Name;
                return "Loading";
            });
            this.selectedNavigationItem.subscribe(n => {
                if (n != null)
                    n.unload();
            }, this, "beforeChange");
            this.selectedNavigationItem.subscribe(n => {
                if(n != null)
                    n.load();
            });
            for (var i: number = 0; i < navigationData.length; i++) {
                var navItem = Container.Resolve<ViewModels.Navigation.NavigationItem>(typeof ViewModels.Navigation.NavigationItem, navigationData[i].Name,
                    [new Lind.IoC.ConstructorParameterFactory("data", () => navigationData[i])]);
                navItem.closed.add(this.onNavigationItemClosed);
                navItem.navigationItemAdded.add(this.onNavigationItemAdded);
                this.navigationItems.push(navItem);
            }
            this.selectedNavigationItem(this.navigationItems.peek()[0]);
        }
        public navigationItems: KnockoutObservableArray<ViewModels.Navigation.NavigationItem>;
        public selectedNavigationItem: KnockoutObservable<ViewModels.Navigation.NavigationItem>;
        public selectedNavigationItemType: KnockoutComputed<string>;
        private onNavigationItemClosed(item: ViewModels.Navigation.NavigationItem) {
            item.closed.remove(this.onNavigationItemClosed);
            item.navigationItemAdded.remove(this.onNavigationItemAdded);
            this.navigationItems.remove(item);
            if (this.selectedNavigationItem() == item)
                this.selectedNavigationItem(this.navigationItems.peek()[0]);
        }
        private onNavigationItemAdded(item: ViewModels.Navigation.NavigationItem) {
            item.navigationItemAdded.add(this.onNavigationItemAdded);
            item.closed.add(this.onNavigationItemClosed);
            this.navigationItems.push(item);
            this.selectedNavigationItem(item);
        }
    }
}