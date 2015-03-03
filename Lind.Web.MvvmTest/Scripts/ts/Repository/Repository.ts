/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
module Northwind.Repository {
    export interface IRepository {
        Delete(id: number): JQueryPromise<void>;
        ServiceLocation: string;
    }
    export interface IRepositoryGeneric<TEntity> extends IRepository {
        GetAll(): JQueryPromise<TEntity[]>;
        Get(id: number): JQueryPromise<TEntity>;
        Add(entity: TEntity): JQueryPromise<TEntity>;
        Update(entity: TEntity): JQueryPromise<void>;
    }
    export class Repository<TEntity> implements IRepositoryGeneric<TEntity>{
        constructor(public ServiceLocation: string) { }
        Delete(id: number): JQueryPromise<void> {
            return <JQueryPromise<void>>$.ajax({
                type: "DELETE",
                url: this.ServiceLocation + "Delete/" + id +"?time="+new Date().getTime()
            });
        }
        GetAll(): JQueryPromise<TEntity[]> {
            return <JQueryPromise<TEntity[]>>$.ajax({
                type: "GET",
                url: this.ServiceLocation + "GetAll" + "?time=" + new Date().getTime(),
            });
        }
        Get(id: number): JQueryPromise<TEntity> {
            return <JQueryPromise<TEntity>>$.ajax({
                type: "GET",
                url: this.ServiceLocation + "Get/" + id + "?time=" + new Date().getTime(),
            });
        }
        Add(entity: TEntity): JQueryPromise<TEntity> {
            return <JQueryPromise<TEntity>>$.ajax({
                type: "POST",
                url: this.ServiceLocation + "Post" + "?time=" + new Date().getTime(),
                data: JSON.stringify(entity),
                contentType: "application/json; charset=utf-8",
                dataType: 'json'
            });
        }
        Update(entity: TEntity): JQueryPromise<void> {
            return <JQueryPromise<void>>$.ajax({
                type: "PUT",
                url: this.ServiceLocation + "Put" + "?time=" + new Date().getTime(),
                data: JSON.stringify(entity),
                contentType: "application/json; charset=utf-8",
                dataType: 'json'
            });
        }
    }
}