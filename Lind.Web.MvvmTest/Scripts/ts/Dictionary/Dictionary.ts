module Lind.Collections {
    //http://stackoverflow.com/questions/15877362/declare-and-initialize-a-dictionary-in-typescript

    export interface IDictionary<T> {
        add(key: string, value: T): void;
        remove(key: string): void;
        containsKey(key: string): boolean;
        keys(): string[];
        values(): T[];
        getValue(key: string): T;
        setValue(key: string, value: T);
    }

    export class Dictionary<T> implements IDictionary<T> {

        _keys: string[] = [];
        _values: T[] = [];
        private valueDictionary: { [key: string]: T } = {};
        add(key: string, value: T) {
            this.valueDictionary[key] = value;
            this._keys.push(key);
            this._values.push(value);
        }

        remove(key: string) {
            var index = this._keys.indexOf(key, 0);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);

            delete this.valueDictionary[key];
        }

        keys(): string[] {
            return this._keys;
        }

        values(): T[] {
            return this._values;
        }

        containsKey(key: string) {
            if (typeof this.valueDictionary[key] === "undefined") {
                return false;
            }
            return true;
        }
        getValue(key: string) : T {
            return <T>this.valueDictionary[key];
        }
        setValue(key: string, value: T) {
            var index = this._keys.indexOf(key);
            this._values[index] = value;
            this.valueDictionary[key] = value;
        }
    }


}