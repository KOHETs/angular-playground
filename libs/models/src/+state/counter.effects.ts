import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { CounterState } from './counter.interfaces';

@Injectable()
export class CounterEffects {
  constructor(private actions: Actions, private dataPersistence: DataPersistence<CounterState>) {}
}
