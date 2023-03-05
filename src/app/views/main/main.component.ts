import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
declare var $: any;
@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{
  private observable: Observable<boolean>;
  private subscription: Subscription | null = null;
  public showPopup = false;
  constructor(){
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.showPopup = true);
      }, 10000);
    });
  }

  ngOnInit() {
   this.subscription =  this.observable.subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
