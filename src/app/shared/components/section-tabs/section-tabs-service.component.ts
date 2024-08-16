// active-tab.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveTabService {
  private activeIndexSubject = new BehaviorSubject<number>(0);
  activeIndex$ = this.activeIndexSubject.asObservable();

  changeTab(index: number): void {
    this.activeIndexSubject.next(index);
  }
}
