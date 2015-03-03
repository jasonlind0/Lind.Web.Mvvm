var Northwind;
(function (Northwind) {
    (function (Repository) {
        (function (Mock) {
            var MockRepository = (function () {
                function MockRepository(ServiceLocation) {
                    this.ServiceLocation = ServiceLocation;
                }
                MockRepository.prototype.Delete = function (id) {
                    var d = $.Deferred();
                    d.resolve(null);
                    return d.promise();
                };
                MockRepository.prototype.GetAll = function () {
                    var d = $.Deferred();
                    setTimeout(function () {
                        d.resolve(null);
                    }, 5000);
                    return d.promise();
                };
                MockRepository.prototype.Get = function (id) {
                    var d = $.Deferred();
                    d.resolve(null);
                    return d.promise();
                };
                MockRepository.prototype.Add = function (entity) {
                    var d = $.Deferred();
                    d.resolve(null);
                    return d.promise();
                };
                MockRepository.prototype.Update = function (entity) {
                    var d = $.Deferred();
                    d.resolve(false);
                    return d.promise();
                };
                return MockRepository;
            })();
            Mock.MockRepository = MockRepository;
        })(Repository.Mock || (Repository.Mock = {}));
        var Mock = Repository.Mock;
    })(Northwind.Repository || (Northwind.Repository = {}));
    var Repository = Northwind.Repository;
})(Northwind || (Northwind = {}));
