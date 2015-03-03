var Northwind;
(function (Northwind) {
    /// <reference path="../../typings/knockout/knockout.d.ts" />
    /// <reference path="../../typings/jquery/jquery.d.ts" />
    (function (_Repository) {
        var Repository = (function () {
            function Repository(ServiceLocation) {
                this.ServiceLocation = ServiceLocation;
            }
            Repository.prototype.Delete = function (id) {
                var d = $.Deferred();
                $.ajax({
                    type: "DELETE",
                    async: true,
                    url: this.ServiceLocation + "Delete/" + id,
                    success: function () {
                        return d.resolve(true);
                    },
                    error: function () {
                        return d.resolve(false);
                    }
                });
                return d.promise();
            };
            Repository.prototype.GetAll = function () {
                var d = $.Deferred();
                $.ajax({
                    type: "GET",
                    async: true,
                    url: this.ServiceLocation + "GetAll",
                    success: function (data) {
                        return d.resolve(data);
                    },
                    error: function (err) {
                        return d.resolve(null);
                    }
                });
                return d.promise();
            };
            Repository.prototype.Get = function (id) {
                var d = $.Deferred();
                $.ajax({
                    type: "GET",
                    async: true,
                    url: this.ServiceLocation + "Get/" + id,
                    success: function (data) {
                        return d.resolve(data);
                    },
                    error: function () {
                        return d.resolve(null);
                    }
                });
                return d.promise();
            };
            Repository.prototype.Add = function (entity) {
                var d = $.Deferred();
                $.ajax({
                    type: "POST",
                    async: true,
                    url: this.ServiceLocation + "Post",
                    data: JSON.stringify(entity),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        return d.resolve(data);
                    },
                    error: function () {
                        return d.resolve(null);
                    }
                });
                return d.promise();
            };
            Repository.prototype.Update = function (entity) {
                var d = $.Deferred();
                $.ajax({
                    type: "PUT",
                    async: true,
                    url: this.ServiceLocation + "Put",
                    data: JSON.stringify(entity),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function () {
                        return d.resolve(true);
                    },
                    error: function () {
                        return d.resolve(false);
                    }
                });
                return d.promise();
            };
            return Repository;
        })();
        _Repository.Repository = Repository;
    })(Northwind.Repository || (Northwind.Repository = {}));
    var Repository = Northwind.Repository;
})(Northwind || (Northwind = {}));
