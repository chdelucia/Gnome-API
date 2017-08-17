import { Component, OnInit, ViewChild }       from '@angular/core';

import { BrastlewarkService }                     from './../../shared/services/brastlewark.service';
import { Observable }                         from 'rxjs/Observable';
import { environment }                        from './../../../../environments/environment';
import { BrastlewarkObject }                      from './../../shared/services/brastlewark';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {

  inhabitants = [];
  numberPerPage = 24;
  actualPage : number;
  constructor( private brastlewark: BrastlewarkService) {
    this.actualPage = 0;
   }
    
  ngOnInit() {
    this.recoverDataFromStorage();
    this.getInhabitants();
  }

  getInhabitants(){  
      this.brastlewark.getInhabitants().subscribe( 
        result => {
          console.log(result);
          this.inhabitants = result.Brastlewark.slice(this.actualPage * this.numberPerPage,this.numberPerPage);
      })
  }


  renderCityData(result:BrastlewarkObject){ 
      let verify = 0;
  }

  /*
  * Look for a previous  inhabitans if exist in Storage
  */
  recoverDataFromStorage(){
      if (localStorage.getItem('Brastlewark') !== null) {
        this.inhabitants.push(this.brastlewark.getLocalStorage());
      }
  }
  

}
