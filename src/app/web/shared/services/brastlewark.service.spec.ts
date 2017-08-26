import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule }                             from '@angular/http';

import { BrastlewarkService } from './brastlewark.service';

describe('Service: BrastlewarkService', () => {
  let service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ BrastlewarkService ]
    })
  }));

  beforeEach(inject([BrastlewarkService], s => {
    service = s;
  }));


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get inhabitants', async(() => {
    service.getInhabitants().subscribe (x => {
      console.log(x.Brastlewark.length);
      expect(x.Brastlewark.length).toBeTruthy();
    })
  }));
  
});
