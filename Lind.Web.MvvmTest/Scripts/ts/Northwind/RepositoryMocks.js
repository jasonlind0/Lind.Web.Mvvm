var Northwind;
(function (Northwind) {
    (function (Repository) {
        (function (Mock) {
            var MockRepository = (function () {
                function MockRepository(ServiceLocation) {
                    this.ServiceLocation = ServiceLocation;
                }
                MockRepository.prototype.Delete = function (id) {
                    var d = Repository.defer();
                    d.resolve(null);
                    return d.promise();
                };
                MockRepository.prototype.GetAll = function () {
                    var _this = this;
                    var d = Repository.defer();
                    setTimeout(function () {
                        $.ajax({
                            type: "GET",
                            url: _this.ServiceLocation,
                            success: function (data) {
                                return d.resolve(data);
                            },
                            error: function (err) {
                                return d.resolve(null);
                            }
                        });
                    }, 1000);
                    return d.promise();
                };
                MockRepository.prototype.Get = function (id) {
                    var d = Repository.defer();
                    d.resolve(null);
                    return d.promise();
                };
                MockRepository.prototype.Add = function (entity) {
                    var d = Repository.defer();
                    d.resolve(null);
                    return d.promise();
                };
                MockRepository.prototype.Update = function (entity) {
                    var d = Repository.defer();
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
