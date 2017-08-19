import { Component, OnInit, ViewChild } from '@angular/core';

import { BrastlewarkService } from './../../shared/services/brastlewark.service';
import { PagerService } from './../../shared/services/pager.service';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../../environments/environment';
import { Brastlewark } from './../../shared/services/brastlewark';

import { trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('2s ease', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  inhabitants: Brastlewark[] = [];
  pagedInhabitants: Brastlewark[] = [];
  filteredInhabitants: Brastlewark[] = [];
  jobs : string[] = [];
  pager: any = {};
  totalPages:number = 0;
  jobsActivate : boolean = false;

  constructor(private brastlewark: BrastlewarkService, private pagerService: PagerService) {}

  ngOnInit() {
    /* remove comment for load data from Storage  to avoid delays in case real API*/
    //this.recoverDataFromStorage();
    this.getInhabitants();
  }

  getInhabitants() {
    this.brastlewark.getInhabitants().subscribe(
      result => {
        this.inhabitants = result.Brastlewark;
        this.totalPages = result.Brastlewark.length 
        this.setPage(1);
        this.listJobs();
      })
  }

  /*
  * creates an Array with all jobs order DESC
  */
  listJobs() {
    this.inhabitants.map(item => {
      item.professions.map(job => {
        if (!this.jobs.includes(job.trim())) {
          this.jobs.push(job.trim())
        }
      })
    })
    this.jobs = this.jobs.sort();
  }

  filterByProfession(value: string) {
    //clear results
    this.filteredInhabitants = [];

    // show all profiles
    if(value === "all"){
      this.totalPages = this.inhabitants.length
      this.jobsActivate = false;
    }

    // show profiles if job match
    else{
    this.inhabitants.map(item => {
      item.professions.map(job => {
        if (job.trim() === value) {
          this.filteredInhabitants.push(item);
        }
      })
    })
    this.totalPages = this.filteredInhabitants.length
    this.jobsActivate = true;
    }
    this.setPage(1);
  }

  /*
  * Look for a previous  inhabitans if exist in Storage
  */
  recoverDataFromStorage() {
    if (localStorage.getItem('Brastlewark') !== null) {
      this.inhabitants = this.brastlewark.getLocalStorage().Brastlewark;
      this.totalPages = this.inhabitants.length 
      this.setPage(1);
      this.listJobs();
    }
  }


  /*
  * Optimization for bucle
  */
  trackInhabitant(index,inhabitant){
    return inhabitant ? inhabitant.id : undefined;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalPages, page);

    // get current page of items
    this.pagedInhabitants = this.jobsActivate ? this.filteredInhabitants.slice(this.pager.startIndex, this.pager.endIndex + 1) : this.inhabitants.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


}
