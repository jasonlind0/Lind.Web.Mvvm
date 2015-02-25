/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../Promise.ts" />
module Northwind.Repository {
    export var defer = P.defer;
    export var when = P.when;
    export interface Promise<Value> extends P.Promise<Value> { }
    export interface IRepository {
        Delete(id: number): Promise<boolean>;
        ServiceLocation: string;
    }
    export interface IRepositoryGeneric<TEntity> extends IRepository {
        GetAll(): Promise<TEntity[]>;
        Get(id: number): Promise<TEntity>;
        Add(entity: TEntity): Promise<TEntity>;
        Update(entity: TEntity): Promise<boolean>;
    }
    export class Repository<TEntity> implements IRepositoryGeneric<TEntity>{
        constructor(public ServiceLocation: string) { }
        Delete(id: number): Promise<boolean> {
            var d = defer<boolean>();
            $.ajax({
                type: "DELETE",
                url: this.ServiceLocation + "Delete/" + id,
                success: () => d.resolve(true),
                error: () => d.resolve(false)
            });
            return d.promise();
        }
        GetAll(): Promise<TEntity[]> {
            var d = defer<TEntity[]>();
            $.ajax({
                type: "GET",
                url: this.ServiceLocation + "GetAll",
                success: data => d.resolve(<TEntity[]>data),
                error: err => d.resolve(null)
            });
            return d.promise();
        }
        Get(id: number): Promise<TEntity> {
            var d = defer<TEntity>();
            $.ajax({
                type: "GET",
                url: this.ServiceLocation + "Get/" + id,
                success: data => d.resolve(<TEntity>data),
                error: () => d.resolve(null)
            });
            return d.promise();
        }
        Add(entity: TEntity): Promise<TEntity> {
            var d = defer<TEntity>();
            $.ajax({
                type: "POST",
                url: this.ServiceLocation + "Post",
                data: JSON.stringify(entity),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: data => d.resolve(<TEntity>data),
                error: () => d.resolve(null)
            });
            return d.promise();
        }
        Update(entity: TEntity): Promise<boolean> {
            var d = defer<boolean>();
            $.ajax({
                type: "PUT",
                url: this.ServiceLocation + "Put",
                data: JSON.stringify(entity),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: () => d.resolve(true),
                error: () => d.resolve(false)
            });
            return d.promise();
            
        }
    }
}