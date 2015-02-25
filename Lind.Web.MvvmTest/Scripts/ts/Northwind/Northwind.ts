/// <reference path="../../typings/knockout/knockout.d.ts" />
module Northwind {
    export interface IOrderDetail {
        OrderID: number;
        ProductID: number;
        UnitPrice: number;
        Quantity: number;
        Discount: number;
        Product: IProduct;
    }
    export class OrderDetail implements IOrderDetail {
        constructor(public OrderID: number,
            public ProductID: number,
            public UnitPrice: number,
            public Quantity: number,
            public Discount: number,
            public Product: IProduct) {
            this.productID = ko.observable(ProductID);
            this.productID.subscribe(p => this.ProductID = p);
            this.orderID = ko.observable(OrderID);
            this.orderID.subscribe(p => this.OrderID = p);
            this.unitPrice = ko.observable(UnitPrice);
            this.unitPrice.subscribe(p => this.UnitPrice = p);
            this.quantity = ko.observable(Quantity);
            this.quantity.subscribe(p => this.Quantity = p);
            this.discount = ko.observable(Discount);
            this.discount.subscribe(p => this.Discount = p);
            this.product = ko.observable(Product);
            this.product.subscribe(p => this.Product = p);
        }
        public productID: KnockoutObservable<number>;
        public orderID: KnockoutObservable<number>;
        public unitPrice: KnockoutObservable<number>;
        public quantity: KnockoutObservable<number>;
        public discount: KnockoutObservable<number>;
        public product: KnockoutObservable<IProduct>;
        static Create(orderDetail: IOrderDetail): OrderDetail {
            var product: IProduct = null;
            if(orderDetail.Product != null)
                product = Product.Create(orderDetail.Product);
            return new OrderDetail(orderDetail.OrderID, orderDetail.ProductID, orderDetail.UnitPrice, orderDetail.Quantity, orderDetail.Discount, product);
        }
    }
    export interface ICategory {
        CategoryID: number;
        CategoryName: string;
        Description: string;
        Picture: number[]
    }
    export class Category implements ICategory {
        constructor(public CategoryID: number,
            public CategoryName: string,
            public Description: string,
            public Picture: number[]) {
            this.categoryID = ko.observable(CategoryID);
            this.categoryID.subscribe(c => this.CategoryID = c);
            this.categoryName = ko.observable(CategoryName);
            this.categoryName.subscribe(c => this.CategoryName = c);
            this.description = ko.observable(Description);
            this.description.subscribe(c => this.Description = c);
            this.picture = ko.observable(Picture);
            this.picture.subscribe(c => this.Picture = c);
        }
        public categoryName: KnockoutObservable<string>;
        public categoryID: KnockoutObservable<number>;
        public description: KnockoutObservable<string>;
        public picture: KnockoutObservable<number[]>;
        static Create(category: ICategory) {
            return new Category(category.CategoryID, category.CategoryName, category.Description, category.Picture);
        }
    }
    export interface IProduct {
        ProductID: number;
        ProductName: string;
        SupplierID?: number;
        CategoryID?: number;
        QuantityPerUnit: number;
        UnitPrice?: number;
        UnitsInStock?: number;
        UnitsOnOrder?: number;
        ReorderLevel?: number;
        Discontinued: boolean;
        Order_Details: IOrderDetail[];
        Category: ICategory;
        Supplier: ISupplier;
    }
    export class Product implements IProduct {
        constructor(public ProductID: number,
            public ProductName: string,
            public Discontinued: boolean,
            public QuantityPerUnit: number,
            public Order_Details: IOrderDetail[],
            public Category?: ICategory,
            public Supplier?: ISupplier,
            public SupplierID?: number,
            public CategoryID?: number,
            public UnitPrice?: number,
            public UnitsInStock?: number,
            public UnitsOnOrder?: number,
            public ReorderLevel?: number) {
            this.productID = ko.observable(ProductID);
            this.productID.subscribe(p => ProductID = p);
            this.productName = ko.observable(ProductName);
            this.productName.subscribe(p => ProductName = p);
            this.discontinued = ko.observable(Discontinued);
            this.discontinued.subscribe(p => Discontinued = p);
            this.orderDetails = ko.observableArray(Order_Details);
            this.orderDetails.subscribe(p => {
                for (var i: number = 0; i < p.length; i++) {
                    Order_Details.push(p[i]);
                }
            });
            this.category = ko.observable(this.Category);
            this.category.subscribe(p => this.Category = p);
            this.supplier = ko.observable(this.Supplier);
            this.supplier.subscribe(p => this.Supplier = p);
            this.supplierID = ko.observable(SupplierID);
            this.supplierID.subscribe(p => SupplierID = p);
            this.categoryID = ko.observable(CategoryID);
            this.categoryID.subscribe(p => CategoryID = p);
            this.unitPrice = ko.observable(UnitPrice);
            this.unitPrice.subscribe(p => UnitPrice = p);
            this.unitsInStock = ko.observable(UnitsInStock);
            this.unitsInStock.subscribe(p => UnitsInStock = p);
            this.unitsOnOrder = ko.observable(UnitsOnOrder);
            this.unitsOnOrder.subscribe(p => UnitsOnOrder = p);
        }
        public productID: KnockoutObservable<number>;
        public productName: KnockoutObservable<string>;
        public quantityPerUnit: KnockoutObservable<number>;
        public orderDetails: KnockoutObservableArray<IOrderDetail>;
        public category: KnockoutObservable<ICategory>;
        public supplier: KnockoutObservable<ISupplier>;
        public supplierID: KnockoutObservable<number>;
        public categoryID: KnockoutObservable<number>;
        public unitPrice: KnockoutObservable<number>;
        public unitsInStock: KnockoutObservable<number>;
        public unitsOnOrder: KnockoutObservable<number>;
        public reorderLevel: KnockoutObservable<number>;
        public discontinued: KnockoutObservable<boolean>;
        static Create(product: IProduct): Product {
            var orderDetails: OrderDetail[] = [];
            if (product.Order_Details != null) {
                for (var i: number = 0; i < product.Order_Details.length; i++) {
                    orderDetails.push(OrderDetail.Create(product.Order_Details[i]));
                }
            }
            var category: Category = null;
            if (product.Category != null) {
                category = Category.Create(product.Category);
            }
            var supplier: Supplier = null;
            if (product.Supplier != null) {
                supplier = Supplier.Create(product.Supplier);
            }
            return new Product(product.ProductID, product.ProductName, product.Discontinued, product.QuantityPerUnit, orderDetails, category, supplier,
                product.SupplierID, product.CategoryID, product.UnitPrice, product.UnitsInStock, product.UnitsOnOrder, product.ReorderLevel);
        }
    }
    export interface ISupplier {
        SupplierID: number;
        CompanyName: string;
        ContactName: string;
        ContactTitle: string;
        Address: string;
        City: string;
        Region: string;
        PostalCode: string;
        Country: string;
        Phone: string;
        Fax: string;
        HomePage: string;
    }
    export class Supplier implements ISupplier {
        constructor(public SupplierID: number,
            public CompanyName: string,
            public ContactName: string,
            public ContactTitle: string,
            public Address: string,
            public City: string,
            public Region: string,
            public PostalCode: string,
            public Country: string,
            public Phone: string,
            public Fax: string,
            public HomePage: string) {
            this.supplierID = ko.observable(SupplierID);
            this.supplierID.subscribe(s => this.SupplierID = s);
            this.companyName = ko.observable(CompanyName);
            this.companyName.subscribe(s => this.CompanyName = s);
            this.contactTitle = ko.observable(ContactTitle);
            this.contactTitle.subscribe(s => this.ContactTitle = s);
            this.contactName = ko.observable(ContactName);
            this.contactName.subscribe(s => ContactName = s);
            this.address = ko.observable(Address);
            this.address.subscribe(s => this.Address = s);
            this.city = ko.observable(City);
            this.city.subscribe(s => this.City = s);
            this.region = ko.observable(Region);
            this.region.subscribe(s => this.Region = s);
            this.postalCode = ko.observable(PostalCode);
            this.postalCode.subscribe(s => PostalCode = s);
            this.country = ko.observable(Country);
            this.country.subscribe(s => Country = s);
            this.phone = ko.observable(Phone);
            this.phone.subscribe(s => Phone = s);
            this.fax = ko.observable(Fax);
            this.fax.subscribe(s => Fax = s);
            this.homePage = ko.observable(HomePage);
            this.homePage.subscribe(s => HomePage = s);
            this.hasHomePage = ko.computed(() => this.homePage() != null);
        }
        public supplierID: KnockoutObservable<number>;
        public companyName: KnockoutObservable<string>;
        public contactName: KnockoutObservable<string>;
        public contactTitle: KnockoutObservable<string>;
        public address: KnockoutObservable<string>;
        public city: KnockoutObservable<string>;
        public region: KnockoutObservable<string>;
        public postalCode: KnockoutObservable<string>;
        public country: KnockoutObservable<string>;
        public phone: KnockoutObservable<string>;
        public fax: KnockoutObservable<string>;
        public homePage: KnockoutObservable<string>;
        public hasHomePage: KnockoutComputed<boolean>;
        static Create(supplier: ISupplier): Supplier {
            return new Supplier(supplier.SupplierID, supplier.CompanyName, supplier.ContactName, supplier.ContactTitle, supplier.Address, supplier.City, supplier.Region,
                supplier.PostalCode, supplier.Country, supplier.Phone, supplier.Fax, supplier.HomePage);
        }
    }
}