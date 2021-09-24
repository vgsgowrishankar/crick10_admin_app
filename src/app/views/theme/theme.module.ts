// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ColorsComponent,
    TypographyComponent
  ]
})
export class ThemeModule { }
