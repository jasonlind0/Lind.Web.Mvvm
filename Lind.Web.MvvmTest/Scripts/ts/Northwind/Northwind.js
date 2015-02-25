/// <reference path="../../typings/knockout/knockout.d.ts" />
var Northwind;
(function (Northwind) {
    var OrderDetail = (function () {
        function OrderDetail(OrderID, ProductID, UnitPrice, Quantity, Discount, Product) {
            var _this = this;
            this.OrderID = OrderID;
            this.ProductID = ProductID;
            this.UnitPrice = UnitPrice;
            this.Quantity = Quantity;
            this.Discount = Discount;
            this.Product = Product;
            this.productID = ko.observable(ProductID);
            this.productID.subscribe(function (p) {
                return _this.ProductID = p;
            });
            this.orderID = ko.observable(OrderID);
            this.orderID.subscribe(function (p) {
                return _this.OrderID = p;
            });
            this.unitPrice = ko.observable(UnitPrice);
            this.unitPrice.subscribe(function (p) {
                return _this.UnitPrice = p;
            });
            this.quantity = ko.observable(Quantity);
            this.quantity.subscribe(function (p) {
                return _this.Quantity = p;
            });
            this.discount = ko.observable(Discount);
            this.discount.subscribe(function (p) {
                return _this.Discount = p;
            });
            this.product = ko.observable(Product);
            this.product.subscribe(function (p) {
                return _this.Product = p;
            });
        }
        OrderDetail.Create = function (orderDetail) {
            var product = null;
            if (orderDetail.Product != null)
                product = Product.Create(orderDetail.Product);
            return new OrderDetail(orderDetail.OrderID, orderDetail.ProductID, orderDetail.UnitPrice, orderDetail.Quantity, orderDetail.Discount, product);
        };
        return OrderDetail;
    })();
    Northwind.OrderDetail = OrderDetail;

    var Category = (function () {
        function Category(CategoryID, CategoryName, Description, Picture) {
            var _this = this;
            this.CategoryID = CategoryID;
            this.CategoryName = CategoryName;
            this.Description = Description;
            this.Picture = Picture;
            this.categoryID = ko.observable(CategoryID);
            this.categoryID.subscribe(function (c) {
                return _this.CategoryID = c;
            });
            this.categoryName = ko.observable(CategoryName);
            this.categoryName.subscribe(function (c) {
                return _this.CategoryName = c;
            });
            this.description = ko.observable(Description);
            this.description.subscribe(function (c) {
                return _this.Description = c;
            });
            this.picture = ko.observable(Picture);
            this.picture.subscribe(function (c) {
                return _this.Picture = c;
            });
        }
        Category.Create = function (category) {
            return new Category(category.CategoryID, category.CategoryName, category.Description, category.Picture);
        };
        return Category;
    })();
    Northwind.Category = Category;

    var Product = (function () {
        function Product(ProductID, ProductName, Discontinued, QuantityPerUnit, Order_Details, Category, Supplier, SupplierID, CategoryID, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel) {
            var _this = this;
            this.ProductID = ProductID;
            this.ProductName = ProductName;
            this.Discontinued = Discontinued;
            this.QuantityPerUnit = QuantityPerUnit;
            this.Order_Details = Order_Details;
            this.Category = Category;
            this.Supplier = Supplier;
            this.SupplierID = SupplierID;
            this.CategoryID = CategoryID;
            this.UnitPrice = UnitPrice;
            this.UnitsInStock = UnitsInStock;
            this.UnitsOnOrder = UnitsOnOrder;
            this.ReorderLevel = ReorderLevel;
            this.productID = ko.observable(ProductID);
            this.productID.subscribe(function (p) {
                return ProductID = p;
            });
            this.productName = ko.observable(ProductName);
            this.productName.subscribe(function (p) {
                return ProductName = p;
            });
            this.discontinued = ko.observable(Discontinued);
            this.discontinued.subscribe(function (p) {
                return Discontinued = p;
            });
            this.orderDetails = ko.observableArray(Order_Details);
            this.orderDetails.subscribe(function (p) {
                for (var i = 0; i < p.length; i++) {
                    Order_Details.push(p[i]);
                }
            });
            this.category = ko.observable(this.Category);
            this.category.subscribe(function (p) {
                return _this.Category = p;
            });
            this.supplier = ko.observable(this.Supplier);
            this.supplier.subscribe(function (p) {
                return _this.Supplier = p;
            });
            this.supplierID = ko.observable(SupplierID);
            this.supplierID.subscribe(function (p) {
                return SupplierID = p;
            });
            this.categoryID = ko.observable(CategoryID);
            this.categoryID.subscribe(function (p) {
                return CategoryID = p;
            });
            this.unitPrice = ko.observable(UnitPrice);
            this.unitPrice.subscribe(function (p) {
                return UnitPrice = p;
            });
            this.unitsInStock = ko.observable(UnitsInStock);
            this.unitsInStock.subscribe(function (p) {
                return UnitsInStock = p;
            });
            this.unitsOnOrder = ko.observable(UnitsOnOrder);
            this.unitsOnOrder.subscribe(function (p) {
                return UnitsOnOrder = p;
            });
        }
        Product.Create = function (product) {
            var orderDetails = [];
            if (product.Order_Details != null) {
                for (var i = 0; i < product.Order_Details.length; i++) {
                    orderDetails.push(OrderDetail.Create(product.Order_Details[i]));
                }
            }
            var category = null;
            if (product.Category != null) {
                category = Category.Create(product.Category);
            }
            var supplier = null;
            if (product.Supplier != null) {
                supplier = Supplier.Create(product.Supplier);
            }
            return new Product(product.ProductID, product.ProductName, product.Discontinued, product.QuantityPerUnit, orderDetails, category, supplier, product.SupplierID, product.CategoryID, product.UnitPrice, product.UnitsInStock, product.UnitsOnOrder, product.ReorderLevel);
        };
        return Product;
    })();
    Northwind.Product = Product;

    var Supplier = (function () {
        function Supplier(SupplierID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax, HomePage) {
            var _this = this;
            this.SupplierID = SupplierID;
            this.CompanyName = CompanyName;
            this.ContactName = ContactName;
            this.ContactTitle = ContactTitle;
            this.Address = Address;
            this.City = City;
            this.Region = Region;
            this.PostalCode = PostalCode;
            this.Country = Country;
            this.Phone = Phone;
            this.Fax = Fax;
            this.HomePage = HomePage;
            this.supplierID = ko.observable(SupplierID);
            this.supplierID.subscribe(function (s) {
                return _this.SupplierID = s;
            });
            this.companyName = ko.observable(CompanyName);
            this.companyName.subscribe(function (s) {
                return _this.CompanyName = s;
            });
            this.contactTitle = ko.observable(ContactTitle);
            this.contactTitle.subscribe(function (s) {
                return _this.ContactTitle = s;
            });
            this.contactName = ko.observable(ContactName);
            this.contactName.subscribe(function (s) {
                return ContactName = s;
            });
            this.address = ko.observable(Address);
            this.address.subscribe(function (s) {
                return _this.Address = s;
            });
            this.city = ko.observable(City);
            this.city.subscribe(function (s) {
                return _this.City = s;
            });
            this.region = ko.observable(Region);
            this.region.subscribe(function (s) {
                return _this.Region = s;
            });
            this.postalCode = ko.observable(PostalCode);
            this.postalCode.subscribe(function (s) {
                return PostalCode = s;
            });
            this.country = ko.observable(Country);
            this.country.subscribe(function (s) {
                return Country = s;
            });
            this.phone = ko.observable(Phone);
            this.phone.subscribe(function (s) {
                return Phone = s;
            });
            this.fax = ko.observable(Fax);
            this.fax.subscribe(function (s) {
                return Fax = s;
            });
            this.homePage = ko.observable(HomePage);
            this.homePage.subscribe(function (s) {
                return HomePage = s;
            });
            this.hasHomePage = ko.computed(function () {
                return _this.homePage() != null;
            });
        }
        Supplier.Create = function (supplier) {
            return new Supplier(supplier.SupplierID, supplier.CompanyName, supplier.ContactName, supplier.ContactTitle, supplier.Address, supplier.City, supplier.Region, supplier.PostalCode, supplier.Country, supplier.Phone, supplier.Fax, supplier.HomePage);
        };
        return Supplier;
    })();
    Northwind.Supplier = Supplier;
})(Northwind || (Northwind = {}));
