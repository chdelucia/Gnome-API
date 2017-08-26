import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { environment } from './../../../../environments/environment';
import { BrastlewarkObject, Brastlewark } from './brastlewark';

@Injectable()
export class BrastlewarkService {
    private inhabitants: Brastlewark[] = [];
    

    constructor(private http: Http) { }

    getInhabitants(): Observable<BrastlewarkObject> {
        return this.http
            .get(environment.baseUrl)
            .retry(3)
            .map(response => this.setLocalStorage(response.json()))
            .catch(this.handleError)

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
    listJobs(inhabitants:Brastlewark[]): string[] {
        let jobs: string[] = []
        inhabitants.map(item => {
            item.professions.map(job => {
                if (!jobs.includes(job.trim())) {
                    jobs.push(job.trim())
                }
            })
        })
        return jobs.sort();
    }

    filterByProfession(profession: string, inhabitants:Brastlewark[]) : Brastlewark[]{
        let filteredInhabitants: Brastlewark[] = [];
        if(profession === "all"){
            filteredInhabitants = this.inhabitants;
        }
        else{
        inhabitants.map(item => {
            item.professions.map(job => {
              if (job.trim() === profession) {
                filteredInhabitants.push(item);
              }
            })
          })
        }

          return filteredInhabitants;
    }

    listNames(text:string,inhabitants:Brastlewark[]) : Brastlewark[]{
        return inhabitants.filter(x => x.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.text || ' error');
    }

}
