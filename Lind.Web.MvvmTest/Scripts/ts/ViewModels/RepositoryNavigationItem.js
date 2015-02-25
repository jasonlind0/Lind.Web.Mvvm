var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ViewModels;
(function (ViewModels) {
    /// <reference path="../../typings/knockout/knockout.d.ts" />
    /// <reference path="../../Promise.ts" />
    (function (_Repository) {
        _Repository.defer = P.defer;
        _Repository.when = P.when;

        var RepositoryNavigationItem = (function (_super) {
            __extends(RepositoryNavigationItem, _super);
            function RepositoryNavigationItem(data, Repository) {
                _super.call(this, data);
                this.Repository = Repository;
            }
            RepositoryNavigationItem.prototype.getItems = function () {
                var _this = this;
                var d = _Repository.defer();
                this.Repository.GetAll().done(function (i) {
                    var vms = [];
                    if (i != null) {
                        for (var k = 0; k < i.length; k++) {
                            vms.push(_this.createViewModel(i[k]));
                        }
                    }
                    d.resolve(vms);
                });
                return d.promise();
            };
            RepositoryNavigationItem.prototype.createViewModel = function (entity) {
                return null;
            };
            return RepositoryNavigationItem;
        })(ViewModels.Navigation.NavigationItemCollection);
        _Repository.RepositoryNavigationItem = RepositoryNavigationItem;
        var ProductsNavigationItem = (function (_super) {
            __extends(ProductsNavigationItem, _super);
            function ProductsNavigationItem() {
                _super.apply(this, arguments);
            }
            ProductsNavigationItem.prototype.createViewModel = function (entity) {
                return Northwind.Product.Create(entity);
            };
            return ProductsNavigationItem;
        })(RepositoryNavigationItem);
        _Repository.ProductsNavigationItem = ProductsNavigationItem;
        var SuppliersNavigationItem = (function (_super) {
            __extends(SuppliersNavigationItem, _super);
            function SuppliersNavigationItem() {
                _super.apply(this, arguments);
            }
            SuppliersNavigationItem.prototype.createViewModel = function (entity) {
                return Northwind.Supplier.Create(entity);
            };
            return SuppliersNavigationItem;
        })(RepositoryNavigationItem);
        _Repository.SuppliersNavigationItem = SuppliersNavigationItem;
    })(ViewModels.Repository || (ViewModels.Repository = {}));
    var Repository = ViewModels.Repository;
})(ViewModels || (ViewModels = {}));
