import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { counterReducer } from './+state/counter.reducer';
import { counterInitialState } from './+state/counter.init';
import { CounterEffects } from './+state/counter.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('counter', counterReducer, { initialState: counterInitialState }),
    EffectsModule.forFeature([CounterEffects]),
  ],
  providers: [CounterEffects],
})
export class ModelsModule {}
