import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { BrastlewarkService } from './brastlewark.service';

describe('Service: BrastlewarkService', () => {
  let service;
  let inhabitants;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [BrastlewarkService]
    })
  }));

  beforeEach(inject([BrastlewarkService], s => {
    service = s;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get inhabitants', async(() => {
    service.getInhabitants().subscribe(x => {
      inhabitants = x
      expect(x.Brastlewark.length).toBeTruthy();
    })
  }));

  it('should get jobs', () => {
    let expectedJobs = ["Baker", "Blacksmith", "Brewer", "Butcher", "Carpenter", "Cook", "Farmer", "Gemcutter", "Leatherworker", "Marble Carver", "Mason", "Mechanic", "Medic", "Metalworker", "Miner", "Potter", "Prospector", "Sculptor", "Smelter", "Stonecarver", "Tailor", "Tax inspector", "Tinker", "Woodcarver"];
    let jobs = service.listJobs(inhabitants.Brastlewark);
    expect(jobs).toEqual(expectedJobs);
  });

  it('should save to localStorage', () => {
    let items = service.getLocalStorage();
    expect(items.Brastlewark.length).toBe(1337);
  })

  it('should filter by job', () => {
    let items = service.filterByProfession("Baker",inhabitants.Brastlewark);
    items.forEach(element => {
      expect(element.professions.includes("Baker")).toBeTruthy();
    });
  });

  it('should filter by name', () => {
    let items = service.listNames("Quick",inhabitants.Brastlewark);
    items.forEach(element => {
      expect(element.name.includes("Quick")).toBeTruthy();
    });
  });


});
