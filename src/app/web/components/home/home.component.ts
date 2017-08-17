import { Component, OnInit, ViewChild } from '@angular/core';

import { BrastlewarkService } from './../../shared/services/brastlewark.service';
import { PagerService } from './../../shared/services/pager.service';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../../environments/environment';
import { Brastlewark } from './../../shared/services/brastlewark';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {

  inhabitants: Brastlewark[] = [];
  pagedInhabitants: Brastlewark[] = [];
  jobs = [];
  actualPage: number;
  pager: any = {};

  constructor(private brastlewark: BrastlewarkService, private pagerService: PagerService) {
    this.actualPage = 1;
  }

  ngOnInit() {
    this.recoverDataFromStorage();
    this.getInhabitants();
  }

  getInhabitants() {
    this.brastlewark.getInhabitants().subscribe(
      result => {
        console.log(result);
        this.inhabitants = result.Brastlewark;
        this.setPage(this.actualPage);
        this.listJobs();
      })
  }

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
    this.pagedInhabitants = [];
    this.inhabitants.map(item => {
      item.professions.map(job => {
        if (job.trim() === value) {
          this.pagedInhabitants.push(item);
        }
      })
    })
  }

  /*
  * Look for a previous  inhabitans if exist in Storage
  */
  recoverDataFromStorage() {
    if (localStorage.getItem('Brastlewark') !== null) {
      this.inhabitants = this.brastlewark.getLocalStorage().Brastlewark;
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.inhabitants.length, page);

    // get current page of items
    this.pagedInhabitants = this.inhabitants.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


}
