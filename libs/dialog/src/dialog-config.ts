/**
 * Inspired by Angular Material 2 MatDialog
 * ref: https://github.com/angular/material2/blob/master/src/lib/dialog
 */

import { InjectionToken } from '@angular/core';

export interface StyleConfig {
  backdropClass?: string;
  panelClass?: string | string[];
}

export const STYLE_CONFIG = new InjectionToken<StyleConfig>('style.config');

export class DialogConfig<D = any> {
  /** Whether the user can close a modal by escape key or click outside modal */
  disableClose? = false;

  /** Wheather the dialog should have backdrop */
  hasBackDrop? = true;

  /** Width of the dialog */
  width? = '';

  /** Height of the dialog */
  height? = '';

  /** Min width of the dialog */
  minWidth?: number | string = '';

  /** Min height of the dialog */
  minHeight?: number | string = '';

  /** Max width of the dialog */
  maxWidth?: number | string = '80vw';

  /** Max height of the dialog */
  maxHeight?: number | string = '100vh';

  /** Injection Data into the child component */
  data?: D | null = null;

  /** ID of the element that describes the dialog */
  ariaDescribedBy?: string | null = null;

  /** Label to assign to the dialog element */
  ariaLabel?: string | null = null;

  /** Wheather the dialog should focus the first focusable element on open */
  autoFocus? = true;

  /** Wheather the dialog should close when the user goes backwards/forwards in history */
  closeOnNavigation? = true;
}
