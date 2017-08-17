
import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { BrastlewarkService }        from './services/brastlewark.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [], 
  providers: [ 
    BrastlewarkService
  ]
})
export class SharedModule { }
