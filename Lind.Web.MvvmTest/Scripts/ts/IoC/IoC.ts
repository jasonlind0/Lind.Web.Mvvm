module Lind.IoC {
    
    export interface IContainer {
        Register<TTo>(typeFrom: string, factory: (arguments?: any[]) => TTo, name?: string, injectionMembers?: IConstructorParameterFactory[]);
        Resolve<T>(type: string, name?: string, resolveOverrides?: IConstructorParameterFactory[]): T;
    }
    export interface IConstructorParameterFactory {
        Construct(): any;
        Name: string;
    }
    export class ConstructorParameterFactory implements IConstructorParameterFactory {
        constructor(public Name: string, private factory: () => any) { }
        Construct(): any {
            return this.factory();
        }
    }
    export class DefaultConstructorFactory implements IConstructorParameterFactory {
        constructor(public Name: string) { }
        Construct(): any {
            return null;
        }
    }
    export class TypedConstructorFactory implements IConstructorParameterFactory {
        constructor(public Name: string, private type: string, private container: IContainer, private typeParameterName?: string, private resolveOverides?: IConstructorParameterFactory[]) {
        }
        Construct(): any {
            return this.container.Resolve(this.type, this.typeParameterName, this.resolveOverides);
        }
    }
    class Dependency {
        private injectionParameters: Lind.Collections.Dictionary<IConstructorParameterFactory>;
        constructor(private factory: (parameters?: any[]) => any, parameters?: IConstructorParameterFactory[]) {
            this.injectionParameters = new Lind.Collections.Dictionary<IConstructorParameterFactory>();
            if (parameters != null) {
                for (var i: number = 0; i < parameters.length; i++) {
                    this.injectionParameters.add(parameters[i].Name, parameters[i]);
                }
            }
        }
        Resolve<T>(parms?: IConstructorParameterFactory[]) : T {
            var p: Lind.Collections.Dictionary<IConstructorParameterFactory> = new Lind.Collections.Dictionary<IConstructorParameterFactory>();
            var ip = this.injectionParameters.values();
            for (var i: number = 0; i < ip.length; i++) {
                p.add(ip[i].Name, ip[i]);
            }
            if (parms != null) {
                for (var i: number = 0; i < parms.length; i++) {
                    p.setValue(parms[i].Name, parms[i]);
                }
            }
            var arguments: any[] = [];
            var pv = p.values();
            for (var i: number = 0; i < pv.length; i++) {
                arguments.push(pv[i].Construct());
            }
            return <T>this.factory(arguments);
        }
    }
    export class Container implements IContainer {
        private namedDepdencies: Lind.Collections.Dictionary<Lind.Collections.Dictionary<Dependency>> = new Lind.Collections.Dictionary<Lind.Collections.Dictionary<Dependency>>();
        private dependencies: Lind.Collections.Dictionary<Dependency> = new Lind.Collections.Dictionary<Dependency>();
        Register<TTo>(typeFrom : string, factory: (arguments?: any[]) => TTo, name?: string, injectionMembers?: IConstructorParameterFactory[]) {
            var dependency = new Dependency(factory, injectionMembers);
            if (name != null) {
                if (!this.namedDepdencies.containsKey(typeFrom))
                    this.namedDepdencies.add(typeFrom, new Lind.Collections.Dictionary<Dependency>());
                var typeDictionary = this.namedDepdencies.getValue(typeFrom);
                if (!typeDictionary.containsKey(name))
                    typeDictionary.add(name, dependency);
                else
                    typeDictionary.setValue(name, dependency);
            }
            else {
            if (!this.dependencies.containsKey(typeFrom))
                this.dependencies.add(typeFrom, dependency);
            else
                this.dependencies.setValue(typeFrom, dependency);
            }
        }
        Resolve<T>(type:string, name?: string, resolveOverrides?: IConstructorParameterFactory[]): T {
            if (name != null) {
                return this.namedDepdencies.getValue(type).getValue(name).Resolve<T>(resolveOverrides);
            }
            else
                return this.dependencies.getValue(type).Resolve<T>(resolveOverrides);
        }
    }
}