/**
 * Inspired by Angular Material 2 MatDialog
 * ref: https://github.com/angular/material2/blob/master/src/lib/dialog
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';

import { DialogService } from './dialog.service';
import { DialogConfig, StyleConfig, STYLE_CONFIG } from './dialog-config';
import { DialogContainerComponent } from './dialog-container.component';

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule, A11yModule],
  providers: [DialogService],
  declarations: [DialogContainerComponent],
  exports: [DialogContainerComponent],
  entryComponents: [DialogContainerComponent],
})
export class DialogModule {
  static forRoot(STYLE_DI_CONFIG: StyleConfig = {}): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [{ provide: STYLE_CONFIG, useValue: STYLE_DI_CONFIG }],
    };
  }
}
