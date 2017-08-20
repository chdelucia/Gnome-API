import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { environment } from './../../../../environments/environment';
import { BrastlewarkObject, Brastlewark } from './brastlewark';

@Injectable()
export class BrastlewarkService {
    private inhabitants: Brastlewark[] = [];
    

    constructor(private http: HttpClient) { }

    getInhabitants(): Observable<BrastlewarkObject> {
        return this.http
            .get<BrastlewarkObject>(environment.baseUrl)
            .retry(3)
            .map(response => this.setLocalStorage(response))

    }

    setLocalStorage(responseJson: BrastlewarkObject): BrastlewarkObject {
        this.inhabitants = responseJson.Brastlewark;

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

    /*
    * creates an Array with all jobs order DESC
    */
    listJobs(): string[] {
        let jobs: string[] = []
        this.inhabitants.map(item => {
            item.professions.map(job => {
                if (!jobs.includes(job.trim())) {
                    jobs.push(job.trim())
                }
            })
        })
        return jobs.sort();;
    }

    filterByProfession(profession: string) : Brastlewark[]{
        let filteredInhabitants: Brastlewark[] = [];
        if(profession === "all"){
            filteredInhabitants = this.inhabitants;
        }
        else{
        this.inhabitants.map(item => {
            item.professions.map(job => {
              if (job.trim() === profession) {
                filteredInhabitants.push(item);
              }
            })
          })
        }

          return filteredInhabitants;
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.text || ' error');
    }

}
