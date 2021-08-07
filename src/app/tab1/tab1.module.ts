import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { HttpClientModule } from '@angular/common/http';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [Tab1Page],
  providers: [FormBuilder]
})
export class Tab1PageModule {}
