var Lind;
(function (Lind) {
    (function (Collections) {
        

        var Dictionary = (function () {
            function Dictionary() {
                this._keys = [];
                this._values = [];
                this.valueDictionary = {};
            }
            Dictionary.prototype.add = function (key, value) {
                this.valueDictionary[key] = value;
                this._keys.push(key);
                this._values.push(value);
            };

            Dictionary.prototype.remove = function (key) {
                var index = this._keys.indexOf(key, 0);
                this._keys.splice(index, 1);
                this._values.splice(index, 1);

                delete this.valueDictionary[key];
            };

            Dictionary.prototype.keys = function () {
                return this._keys;
            };

            Dictionary.prototype.values = function () {
                return this._values;
            };

            Dictionary.prototype.containsKey = function (key) {
                if (typeof this.valueDictionary[key] === "undefined") {
                    return false;
                }
                return true;
            };
            Dictionary.prototype.getValue = function (key) {
                return this.valueDictionary[key];
            };
            Dictionary.prototype.setValue = function (key, value) {
                var index = this._keys.indexOf(key);
                this._values[index] = value;
                this.valueDictionary[key] = value;
            };
            return Dictionary;
        })();
        Collections.Dictionary = Dictionary;
    })(Lind.Collections || (Lind.Collections = {}));
    var Collections = Lind.Collections;
})(Lind || (Lind = {}));
