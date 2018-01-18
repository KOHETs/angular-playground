import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular-playground/dialog';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    DialogModule.forRoot({ backdropClass: 'backdrop-di-class', panelClass: 'pannel-id-class' }),
  ],
  declarations: [AppComponent, DialogComponent],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
})
export class AppModule {}
