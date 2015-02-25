var Lind;
(function (Lind) {
    (function (IoC) {
        var ConstructorParameterFactory = (function () {
            function ConstructorParameterFactory(Name, factory) {
                this.Name = Name;
                this.factory = factory;
            }
            ConstructorParameterFactory.prototype.Construct = function () {
                return this.factory();
            };
            return ConstructorParameterFactory;
        })();
        IoC.ConstructorParameterFactory = ConstructorParameterFactory;
        var DefaultConstructorFactory = (function () {
            function DefaultConstructorFactory(Name) {
                this.Name = Name;
            }
            DefaultConstructorFactory.prototype.Construct = function () {
                return null;
            };
            return DefaultConstructorFactory;
        })();
        IoC.DefaultConstructorFactory = DefaultConstructorFactory;

        var Dependency = (function () {
            function Dependency(factory, parameters) {
                this.factory = factory;
                this.injectionParameters = new Lind.Collections.Dictionary();
                if (parameters != null) {
                    for (var i = 0; i < parameters.length; i++) {
                        this.injectionParameters.add(parameters[i].Name, parameters[i]);
                    }
                }
            }
            Dependency.prototype.Resolve = function (parms) {
                var p = new Lind.Collections.Dictionary();
                var ip = this.injectionParameters.values();
                for (var i = 0; i < ip.length; i++) {
                    p.add(ip[i].Name, ip[i]);
                }
                if (parms != null) {
                    for (var i = 0; i < parms.length; i++) {
                        p.setValue(parms[i].Name, parms[i]);
                    }
                }
                var arguments = [];
                var pv = p.values();
                for (var i = 0; i < pv.length; i++) {
                    arguments.push(pv[i].Construct());
                }
                return this.factory(arguments);
            };
            return Dependency;
        })();
        var Container = (function () {
            function Container() {
                this.namedDepdencies = new Lind.Collections.Dictionary();
                this.dependencies = new Lind.Collections.Dictionary();
            }
            Container.prototype.Register = function (typeFrom, factory, name, injectionMembers) {
                var dependency = new Dependency(factory, injectionMembers);
                if (name != null) {
                    if (!this.namedDepdencies.containsKey(typeFrom))
                        this.namedDepdencies.add(typeFrom, new Lind.Collections.Dictionary());
                    var typeDictionary = this.namedDepdencies.getValue(typeFrom);
                    if (!typeDictionary.containsKey(name))
                        typeDictionary.add(name, dependency);
                    else
                        typeDictionary.setValue(name, dependency);
                } else {
                    if (!this.dependencies.containsKey(typeFrom))
                        this.dependencies.add(typeFrom, dependency);
                    else
                        this.dependencies.setValue(typeFrom, dependency);
                }
            };
            Container.prototype.Resolve = function (type, name, resolveOverrides) {
                if (name != null) {
                    return this.namedDepdencies.getValue(type).getValue(name).Resolve(resolveOverrides);
                } else
                    return this.dependencies.getValue(type).Resolve(resolveOverrides);
            };
            return Container;
        })();
        IoC.Container = Container;
    })(Lind.IoC || (Lind.IoC = {}));
    var IoC = Lind.IoC;
})(Lind || (Lind = {}));
