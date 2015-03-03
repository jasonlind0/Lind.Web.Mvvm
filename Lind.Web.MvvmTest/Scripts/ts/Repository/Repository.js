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
                return $.ajax({
                    type: "DELETE",
                    url: this.ServiceLocation + "Delete/" + id + "?time=" + new Date().getTime()
                });
            };
            Repository.prototype.GetAll = function () {
                return $.ajax({
                    type: "GET",
                    url: this.ServiceLocation + "GetAll" + "?time=" + new Date().getTime()
                });
            };
            Repository.prototype.Get = function (id) {
                return $.ajax({
                    type: "GET",
                    url: this.ServiceLocation + "Get/" + id + "?time=" + new Date().getTime()
                });
            };
            Repository.prototype.Add = function (entity) {
                return $.ajax({
                    type: "POST",
                    url: this.ServiceLocation + "Post" + "?time=" + new Date().getTime(),
                    data: JSON.stringify(entity),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json'
                });
            };
            Repository.prototype.Update = function (entity) {
                return $.ajax({
                    type: "PUT",
                    url: this.ServiceLocation + "Put" + "?time=" + new Date().getTime(),
                    data: JSON.stringify(entity),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json'
                });
            };
            return Repository;
        })();
        _Repository.Repository = Repository;
    })(Northwind.Repository || (Northwind.Repository = {}));
    var Repository = Northwind.Repository;
})(Northwind || (Northwind = {}));
