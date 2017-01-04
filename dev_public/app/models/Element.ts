export class Element {
    private _width:number;
    private _height:number;
    private _name:string;
    private __id:string;
    private _touchable:boolean;
    private _source:string;



    get source(): string {
        return this._source;
    }

    set source(value: string) {
        this._source = value;
    }


    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get _id(): string {
        return this.__id;
    }

    set _id(value: string) {
        this.__id = value;
    }

    get touchable(): boolean {
        return this._touchable;
    }

    set touchable(value: boolean) {
        this._touchable = value;
    }
}