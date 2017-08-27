import { MediacoachportalPage } from './app.po';
import { browser } from 'protractor';

describe('mediacoachportal App', () => {
  let page: MediacoachportalPage;

  beforeEach(() => {
    page = new MediacoachportalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Brastlewark inhabitants');
  });

  it('should display 12 inhabitants', () => {
    page.navigateTo();
    browser.sleep(2000);
    expect(page.getInhabitants().count()).toEqual(12);
  });
  
  it('should not exist yet', () => {
    page.navigateTo();
    browser.sleep(2000);
    expect(page.getInhabitantsFilteredByname().count()).toBe(0);
  })

  it('should display filtered names', () => {
    page.navigateTo();
    page.getSearchInput().sendKeys('quickwhis');
    browser.sleep(2000);
    expect(page.getInhabitantsFilteredByname().count()).toEqual(6);
  });

});
