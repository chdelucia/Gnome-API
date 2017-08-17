
import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { BrastlewarkService }        from './services/brastlewark.service';
import { PagerService }              from './services/pager.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [], 
  providers: [ 
    BrastlewarkService,
    PagerService
  ]
})
export class SharedModule { }
