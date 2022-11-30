import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tea } from '@tea/api-interfaces';
import { Observable, Subject, Subscription, BehaviorSubject } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  inventory: Tea[] = [];
  subject$ = new Subject<Tea[]>();

  constructor(private http: HttpClient) {}

  getInventory(): Subject<Tea[]> {
    this.http.get<any>('brokenleaf.us:3333/api/inventory').subscribe(
      (data) => {
      this.subject$.next(data);
    });

    return this.subject$;
  }
}