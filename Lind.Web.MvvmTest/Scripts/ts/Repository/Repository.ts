/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
module Northwind.Repository {
    export interface IRepository {
        Delete(id: number): JQueryPromise<boolean>;
        ServiceLocation: string;
    }
    export interface IRepositoryGeneric<TEntity> extends IRepository {
        GetAll(): JQueryPromise<TEntity[]>;
        Get(id: number): JQueryPromise<TEntity>;
        Add(entity: TEntity): JQueryPromise<TEntity>;
        Update(entity: TEntity): JQueryPromise<boolean>;
    }
    export class Repository<TEntity> implements IRepositoryGeneric<TEntity>{
        constructor(public ServiceLocation: string) { }
        Delete(id: number): JQueryPromise<boolean> {
            var d = $.Deferred<boolean>();
            $.ajax({
                type: "DELETE",
                async: true,
                url: this.ServiceLocation + "Delete/" + id,
                success: () => d.resolve(true),
                error: () => d.resolve(false)
            });
            return d.promise();
        }
        GetAll(): JQueryPromise<TEntity[]> {
            var d = $.Deferred<TEntity[]>();
            $.ajax({
                type: "GET",
                async: true,
                url: this.ServiceLocation + "GetAll",
                success: data => d.resolve(<TEntity[]>data),
                error: err => d.resolve(null)
            });
            return d.promise();
        }
        Get(id: number): JQueryPromise<TEntity> {
            var d = $.Deferred<TEntity>();
            $.ajax({
                type: "GET",
                async: true,
                url: this.ServiceLocation + "Get/" + id,
                success: data => d.resolve(<TEntity>data),
                error: () => d.resolve(null)
            });
            return d.promise();
        }
        Add(entity: TEntity): JQueryPromise<TEntity> {
            var d = $.Deferred<TEntity>();
            $.ajax({
                type: "POST",
                async: true,
                url: this.ServiceLocation + "Post",
                data: JSON.stringify(entity),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: data => d.resolve(<TEntity>data),
                error: () => d.resolve(null)
            });
            return d.promise();
        }
        Update(entity: TEntity): JQueryPromise<boolean> {
            var d = $.Deferred<boolean>();
            $.ajax({
                type: "PUT",
                async: true,
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