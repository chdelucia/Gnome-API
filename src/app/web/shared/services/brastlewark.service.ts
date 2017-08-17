import { Injectable, Inject }                           from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable }                                   from 'rxjs/Observable';
import 'rxjs/Rx';

import { environment }                                  from './../../../../environments/environment';
import { BrastlewarkObject }                            from './brastlewark';

@Injectable()
export class BrastlewarkService {

    constructor(private http: Http) { }

    getInhabitants(): Observable<BrastlewarkObject> {

        return this.http.get(environment.baseUrl)
            .retry(3)
            .map(response => this.setLocalStorage( response.json() ))
            .catch(this.handleError);
    }

    setLocalStorage(responseJson:BrastlewarkObject) : BrastlewarkObject {
        if (localStorage.getItem('Brastlewark') === null) {
            localStorage.setItem('Brastlewark', JSON.stringify(responseJson));
        }
        else {
            localStorage['Brastlewark'] = JSON.stringify(responseJson);
        }
        return responseJson;
    }

    getLocalStorage(): BrastlewarkObject {
            return JSON.parse(localStorage.getItem('Brastlewark'));
    }



    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.text || ' error');
    }

}
