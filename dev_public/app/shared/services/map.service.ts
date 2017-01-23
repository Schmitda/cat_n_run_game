import {Injectable} from "@angular/core";
import {Response, Http} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'
import {BehaviorSubject} from "rxjs/BehaviorSubject";
@Injectable()

export class MapService{
    constructor(private http: Http) {
    }


    public save(map:any):Observable<any>{
        delete map._id;
        return this.http.post('http://schmitz-dynamics.ch:60/api/map', map)
            .map(this.extractData);
    }

    public getAll():Observable<any[]>{
        return this.http.get('http://schmitz-dynamics.ch:60/api/map')
            .map(this.extractData);
    }

    public getById(id:string):Observable<any[]>{
        return this.http.get('http://schmitz-dynamics.ch:60/api/map/' + id)
            .map(this.extractData);
    }

    public update(map:any):Observable<any>{
        return this.http.put('http://schmitz-dynamics.ch:60/api/map/' + map._id, map)
            .map(this.extractData);
    }

    public delete(id:number):Observable<any>{
        return this.http.delete('http://schmitz-dynamics.ch:60/api/map/' + id)
            .map(this.extractData);
    }


    private extractData(res:Response){
        return res.json() || {};
    }
}
