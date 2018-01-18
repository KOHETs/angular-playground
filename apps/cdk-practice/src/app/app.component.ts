import { Component, OnInit } from '@angular/core';
import { DialogService } from '@angular-playground/dialog';
import { DialogComponent } from 'apps/cdk-practice/src/app/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private dialog: DialogService) {}

  ngOnInit() {}

  openDialog() {
    this.dialog.open(DialogComponent);
  }
}
