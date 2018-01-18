/**
 * Inspired by Angular Material 2 MatDialog
 * ref: https://github.com/angular/material2/blob/master/src/lib/dialog
 */

import { Injectable, Inject, Optional, Injector, ComponentRef } from '@angular/core';
import { Location } from '@angular/common';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentType, ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { STYLE_CONFIG, StyleConfig, DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { DialogContainerComponent } from './dialog-container.component';

@Injectable()
export class DialogService {
  dialogRef: DialogRef<any>;

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Optional() private _location: Location,
    @Optional()
    @Inject(STYLE_CONFIG)
    private _styleConfig: StyleConfig,
  ) {
    if (location) {
      _location.subscribe(() => {
        if (this.dialogRef) {
          this.dialogRef.close();
          this.dialogRef = null;
        }
      });
    }
  }

  open<T>(component: ComponentType<T>, config: DialogConfig = {}) {
    config = _applyConfigDefaults(config, new DialogConfig());

    const overlayRef = this._createOverlay(config);
    const dialogContainer = this._attachDialogContainer(overlayRef, config);
    const dialogRef = this._attachDialogContent<T>(component, dialogContainer, overlayRef, config);

    this.dialogRef = dialogRef;
    this.dialogRef.afterClosed().subscribe(() => (this.dialogRef = null));

    dialogContainer._trapFocus();
    return dialogRef;
  }

  private _attachDialogContent<T>(
    component: ComponentType<T>,
    dialogContainer: DialogContainerComponent,
    overlayRef: OverlayRef,
    config: DialogConfig,
  ) {
    const dialogRef = new DialogRef<T>(overlayRef, dialogContainer, this._location);

    if (config.hasBackDrop) {
      overlayRef.backdropClick().subscribe(() => {
        if (!dialogRef.disabeClose) {
          dialogRef.close();
        }
      });
    }

    const injector = this._createInjector<T>(config, dialogRef, dialogContainer);
    const contentRef = dialogContainer.attachComponentPortal<T>(new ComponentPortal(component, undefined, injector));
    dialogRef.componentInstance = contentRef.instance;

    return dialogRef;
  }

  private _createInjector<T>(config: DialogConfig, dialogRef: DialogRef<T>, dialogContainer: DialogContainerComponent) {
    const injectionTokens = new WeakMap();

    injectionTokens.set(DialogRef, dialogRef);
    injectionTokens.set(DialogContainerComponent, dialogContainer);

    return new PortalInjector(this._injector, injectionTokens);
  }

  private _attachDialogContainer(overlayRef: OverlayRef, config: DialogConfig) {
    const containerPortal = new ComponentPortal(DialogContainerComponent);
    const containerRef: ComponentRef<DialogContainerComponent> = overlayRef.attach(containerPortal);
    containerRef.instance._config = config;

    return containerRef.instance;
  }

  private _createOverlay(config: DialogConfig) {
    const overlayConfig = this._getOverlayConfig(config);
    return this._overlay.create(overlayConfig);
  }

  private _getOverlayConfig(config: DialogConfig) {
    const state = new OverlayConfig({
      positionStrategy: this._overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this._overlay.scrollStrategies.block(),
      panelClass: this._styleConfig ? this._styleConfig.panelClass : '',
      hasBackdrop: config.hasBackDrop,
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
    });

    if (config.hasBackDrop) {
      state.backdropClass = this._styleConfig ? this._styleConfig.backdropClass : '';
    }

    return state;
  }
}

function _applyConfigDefaults(config: DialogConfig, defaultConfig: DialogConfig) {
  return { ...defaultConfig, ...config };
}
