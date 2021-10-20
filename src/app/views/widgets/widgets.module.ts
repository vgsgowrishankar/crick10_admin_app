import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { }
