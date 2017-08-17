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

  constructor( private weather: BrastlewarkService) { }
    
  ngOnInit() {
    this.recoverDataFromStorage();
    this.getWeathers();
  }

  getWeathers(){  
      this.weather.getInhabitants().subscribe( 
        result => {
          console.log(result);
          this.inhabitants = result.Brastlewark.slice(0,24);
      })
  }


  /*
  * Add temperature to city or create new city if not exist yet. weatherInfo = [ [city1..{},{}] , [city2] , [city3] ]
  */
  renderCityData(result:BrastlewarkObject){ 
      let verify = 0;
  }

  /*
  * Look for a previous weather temperatures if exist in Storage
  */
  recoverDataFromStorage(){
      if (localStorage.getItem('Brastlewark') !== null) {
        this.inhabitants.push(this.weather.getLocalStorage());
      }
  }
  

}
