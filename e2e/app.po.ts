import { browser, by, element } from 'protractor';

export class MediacoachportalPage {
  navigateTo() {
    return browser.get('/');
  }

  wait(time:number){
    browser.manage().timeouts().implicitlyWait(time);
  }
  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getInhabitants(){
    return element.all(by.className('portfolio-item'));
  }
}
