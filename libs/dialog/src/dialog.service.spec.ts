/**
 * Inspired by Angular Material 2 MatDialog
 * ref: https://github.com/angular/material2/blob/master/src/lib/dialog
 */

import { TestBed, inject } from '@angular/core/testing';

import { DialogService } from './dialog.service';

describe('DialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService],
    });
  });

  it(
    'should be created',
    inject([DialogService], (service: DialogService) => {
      expect(service).toBeTruthy();
    }),
  );
});
