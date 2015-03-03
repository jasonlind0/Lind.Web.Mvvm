/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/async/async.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
module ViewModels.Navigation {
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
    export class NavigationItemFactory {
        private static FactoryMethod: (data: INavigationData) => NavigationItem;
        public static Create(data: INavigationData): NavigationItem {
            if (this.FactoryMethod != null)
                return this.FactoryMethod(data);
            return null;
        }
        public static Initalize(factoryMethod: (data: INavigationData) => NavigationItem) {
            this.FactoryMethod = factoryMethod;
        }
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
        private queue: AsyncQueue<boolean> = async.queue((s, c) => {
            if (s)
                this.loadWorker().done(() => c());
            else
                this.unloadWorker().done(() => c());
        }, 1);
        load() : JQueryPromise<boolean>{
            var d = $.Deferred<boolean>();
            this.queue.push(true, () => d.resolve(true));
            return d.promise();
        }
        unload() : JQueryPromise<boolean>{
            var d = $.Deferred<boolean>();
            this.queue.push(false, () => d.resolve(true));
            return d.promise();
        }
        private unloadWorker(): JQueryPromise<boolean> {
            var d = $.Deferred<boolean>();
            this.doUnload().done(s => this.onUnloaded(s, d));
            this.onUnloading();
            return d.promise();
        }
        private loadWorker(): JQueryPromise<boolean>{
            var d = $.Deferred<boolean>();
            if (this.isLoaded())
            {
                this.unload();
                this.load();
                d.resolve(false);
            }
            else {
                this.doLoad().done(s => this.onLoaded(s, d));
                this.onLoading();
            }
            return d.promise();
        }
        private onLoaded(loadStatus: boolean, promise: JQueryDeferred<boolean>) {
            this.status(NavigationItemStatus.Loaded);
            promise.resolve(loadStatus);
        }
        private onUnloaded(unloadStatus: boolean, promise: JQueryDeferred<boolean>) {
            this.status(NavigationItemStatus.Unloaded);
            promise.resolve(unloadStatus);
        }
        private onLoading() {
            this.status(NavigationItemStatus.Loading);
        }
        private onUnloading() {
            this.status(NavigationItemStatus.Unloading);
        }
        doLoad(): JQueryPromise<boolean> {
            var d = $.Deferred<boolean>();
            d.resolve(true);
            return d.promise();
        }
        doUnload(): JQueryPromise<boolean> {
            var d = $.Deferred<boolean>();
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
        doLoad(): JQueryPromise<boolean> {
            return this.getItems().then(i => {
                if (i != null) {
                    for (var k: number = 0; k < i.length; k++) {
                        this.items.push(i[k]);
                    }
                }
            }).then(() => true);
        }
        doUnload(): JQueryPromise<boolean> {
            return super.doUnload().then(() => this.items.removeAll()).then(() => true);
        }
        getItems(): JQueryPromise<T[]> {
            var d = $.Deferred<T[]>();
            d.resolve(null);
            return d.promise();
        }
    }
}