import {
  Component,
  ViewChild,
  HostBinding,
  ElementRef,
  ChangeDetectorRef,
  Optional,
  Inject,
  EmbeddedViewRef,
  ComponentRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { BasePortalOutlet, CdkPortalOutlet, TemplatePortal, ComponentPortal } from '@angular/cdk/portal';

import { DialogConfig } from './dialog-config';

@Component({
  selector: 'lib-dialog-container',
  template: `<ng-template cdkPortalOutlet></ng-template>`,
  styles: [],
})
export class DialogContainerComponent extends BasePortalOutlet {
  /** The portal outlet inside of this container into which the dialog content will be loaded. */
  @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;

  /** The class that traps and manages focus within the dialog. */
  private _focusTrap: FocusTrap;

  _config: DialogConfig = {};

  /** Element that was focused before the dialog was opened. Save this to restore upon close. */
  private _elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

  /** ID of the elemement that label the dialog */
  _ariaLabelledBy: string | null = null;

  @HostBinding('tabindex') hostTabIndex = '-1';
  @HostBinding('attr.aria-label') hostAttrAriaLabel = this._config.ariaLabel;
  @HostBinding('attr.aria-labbelledby') hostAttrAriaLabbelledBy = this._ariaLabelledBy;
  @HostBinding('attr.aria-describedby') hostAttrAriaDescribedBy = this._config.ariaDescribedBy;

  constructor(
    private _elementRef: ElementRef,
    private _focusTrapFactory: FocusTrapFactory,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(DOCUMENT)
    private _document: any,
  ) {
    super();
  }

  /**
   * Attach a ComponentPortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this._portalOutlet.hasAttached()) {
      throw new Error('ATTACHED');
    }

    this._savePreviouslyFocusedElement();
    return this._portalOutlet.attachComponentPortal(portal);
  }

  /**
   * Attach a TemplatePortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this._portalOutlet.hasAttached()) {
    }

    this._savePreviouslyFocusedElement();
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  /** Moves the focus inside the focus trap. */
  _trapFocus() {
    if (!this._focusTrap) {
      this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
    }

    // If were to attempt to focus immediately, then the content of the dialog would not yet be
    // ready in instances where change detection has to run first. To deal with this, we simply
    // wait for the microtask queue to be empty.
    if (this._config.autoFocus) {
      this._focusTrap.focusInitialElementWhenReady();
    }
  }

  /** Restores focus to the element that was focused before the dialog opened. */
  private _restoreFocus() {
    const toFocus = this._elementFocusedBeforeDialogWasOpened;

    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (toFocus && typeof toFocus.focus === 'function') {
      toFocus.focus();
    }

    if (this._focusTrap) {
      this._focusTrap.destroy();
    }
  }

  /** Saves a reference to the element that was focused before the dialog was opened. */
  private _savePreviouslyFocusedElement() {
    if (this._document) {
      this._elementFocusedBeforeDialogWasOpened = this._document.activeElement as HTMLElement;

      // Move focus onto the dialog immediately in order to prevent the user from accidentally
      // opening multiple dialogs at the same time. Needs to be async, because the element
      // may not be focusable immediately.
      Promise.resolve().then(() => this._elementRef.nativeElement.focus());
    }
  }
}
