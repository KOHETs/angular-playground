import { OverlayRef } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { ISubscription, Subscription } from 'rxjs/Subscription';

import { DialogContainerComponent } from './dialog-container.component';

/**
 * Inspired by Angular Material 2 MatDialog
 * ref: https://github.com/angular/material2/blob/master/src/lib/dialog
 */

export class DialogRef<T, R = any> {
  /** The instance of component into the dialog */
  componentInstance: T;

  /** Wheather the user is allowed to close the dialog */
  disabeClose = this._containerInstance._config.disableClose;

  /** Subject for notifying the user that the dialog has finished closing. */
  private _afterClosed = new Subject<R | undefined>();

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  /** Subscription to changes in the user's location. */
  private _locationChanges: ISubscription = Subscription.EMPTY;

  constructor(
    private _overlayRef: OverlayRef,
    private _containerInstance: DialogContainerComponent,
    location?: Location,
  ) {
    if (location) {
      this._locationChanges = location.subscribe(() => {
        if (this._containerInstance._config.closeOnNavigation) {
          this.close();
        }
      });
    }
  }

  close(dialogResult?: R) {
    this._result = dialogResult;

    this._overlayRef.detachBackdrop();
    this._overlayRef.dispose();
    this._locationChanges.unsubscribe();
    this._afterClosed.next(this._result);
    this._afterClosed.complete();
  }

  backdropClick() {
    return this._overlayRef.backdropClick();
  }

  keydownEvents() {
    return this._overlayRef.keydownEvents();
  }

  afterClosed() {
    return this._afterClosed.asObservable();
  }
}
