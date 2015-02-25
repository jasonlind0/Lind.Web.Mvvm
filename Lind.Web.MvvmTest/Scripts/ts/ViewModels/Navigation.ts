/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../Promise.ts" />
module ViewModels.Navigation {
    export var defer = P.defer;
    export var when = P.when;
    export interface Promise<Value> extends P.Promise<Value> { }
    export interface INavigationData {
        Name: string;
        DisplayName: string;
        IsCloseable: boolean;
    }
    export enum NavigationItemStatus {
        Loading,
        Loaded,
        Unloading,
        Unloaded
    }
    export class NavigationData implements INavigationData {
        constructor(public Name: string,
            public DisplayName: string,
            public IsCloseable: boolean) {
            this.name = ko.observable(Name);
            this.name.subscribe(n => Name = n);
            this.displayName = ko.observable(DisplayName);
            this.displayName.subscribe(n => DisplayName = n);
            this.isCloseable = ko.observable(IsCloseable);
            this.isCloseable.subscribe(n => IsCloseable = n);
        }
        public name: KnockoutObservable<string>;
        public displayName: KnockoutObservable<string>;
        public isCloseable: KnockoutObservable<boolean>;
    }
    export class NavigationItem {
        constructor(public Data: INavigationData) {
            this.data = ko.observable(Data);
            this.data.subscribe(n => Data = n);
            this.status = ko.observable(NavigationItemStatus.Unloaded);
            this.isLoading = ko.computed(() => this.status() == NavigationItemStatus.Loading);
            this.isLoaded = ko.computed(() => this.status() == NavigationItemStatus.Loaded);
            this.isUnloaded = ko.computed(() => this.status() == NavigationItemStatus.Unloaded);
            this.isUnloading = ko.computed(() => this.status() == NavigationItemStatus.Unloading);
        }
        public data: KnockoutObservable<INavigationData>;
        public status: KnockoutObservable<NavigationItemStatus>;
        public isLoading: KnockoutComputed<boolean>;
        public isLoaded: KnockoutComputed<boolean>;
        public isUnloading: KnockoutComputed<boolean>;
        public isUnloaded: KnockoutComputed<boolean>;
        public closed: Lind.Events.ITypedEvent<NavigationItem> = new Lind.Events.TypedEvent();
        public navigationItemAdded: Lind.Events.ITypedEvent<NavigationItem> = new Lind.Events.TypedEvent();
        private loadPromise: Promise<boolean>;
        private unloadPromise: Promise<boolean>;
        load(): Promise<boolean> {
            var d = defer<boolean>();
            if (this.isUnloading())
                this.unloadPromise.done(s => {
                    this.onLoading();
                    this.loadWorker().done(ls => this.onLoaded(ls, d))
                    });
            else {
                this.loadPromise = this.loadWorker().done(s => this.onLoaded(s, d));
                this.onLoading();
            }
            return d.promise();
        }
        unload(): Promise<boolean> {
            var d = defer<boolean>();
            if (this.isLoading())
                this.loadPromise.done(() => {
                    this.unloadPromise = this.unloadWorker().done(s => this.onUnloaded(s, d));
                    this.onUnloading();
                });
            else {
                this.unloadPromise = this.unloadWorker().done(s => this.onUnloaded(s, d));
                this.onUnloading();
            }
            return d.promise();
        }
        private unloadWorker(): Promise<boolean> {
            var d = defer<boolean>();
            this.doUnload().done(s => d.resolve(s));
            return d.promise();
        }
        private loadWorker(): Promise<boolean>{
            var d = defer<boolean>();
            this.doLoad().done(s => d.resolve(s));
            return d.promise();
        }
        private onLoaded(loadStatus: boolean, promise: P.Deferred<boolean>) {
            this.status(NavigationItemStatus.Loaded);
            promise.resolve(loadStatus);
        }
        private onUnloaded(unloadStatus: boolean, promise: P.Deferred<boolean>) {
            this.status(NavigationItemStatus.Unloaded);
            promise.resolve(unloadStatus);
        }
        private onLoading() {
            this.status(NavigationItemStatus.Loading);
        }
        private onUnloading() {
            this.status(NavigationItemStatus.Unloading);
        }
        doLoad(): Promise<boolean> {
            var d = defer<boolean>();
            d.resolve(true);
            return d.promise();
        }
        doUnload(): Promise<boolean> {
            var d = defer<boolean>();
            d.resolve(true);
            return d.promise();
        }
        close() {
            if(this.status() != NavigationItemStatus.Unloaded)
                this.unload();
            this.closed.trigger(this);
        }
        addNavigationItem(navigationItem : NavigationItem) {
            this.navigationItemAdded.trigger(navigationItem);
        }
    }
    export class NavigationItemCollection<T> extends NavigationItem {
        constructor(data: INavigationData) {
            super(data);
            this.items = ko.observableArray<T>();
        }
        public items: KnockoutObservableArray<T>;
        doLoad(): Promise<boolean> {
            var d = defer<boolean>();
            super.doLoad().done(() => {
                this.getItems().done(i => {
                    if (i != null) {
                        for (var k: number = 0; k < i.length; k++) {
                            this.items.push(i[k]);
                        }
                    }
                    d.resolve(true);
                });
            });
            return d.promise(); 
        }
        doUnload(): Promise<boolean> {
            var d = defer<boolean>();
            super.doUnload().done(() => {
                this.items.removeAll();
                d.resolve(true);
            });
            return d.promise();
        }
        getItems(): Promise<T[]> {
            var d = defer<T[]>();
            d.resolve(null);
            return d.promise();
        }
    }
}