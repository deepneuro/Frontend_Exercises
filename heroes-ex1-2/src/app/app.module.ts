// import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListaComponent } from './lista/lista.component';
import { CardsComponent } from './cards/cards.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsComponent } from './forms/forms.component';
import { HeaderComponent } from './header/header.component';
import { DataService } from './data.service';
import { RouterModule } from '@angular/router';
import { FormComponent } from './forms/form/form.component';






@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    CardsComponent,
    FormsComponent,
    HeaderComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  exports: [ RouterModule ]
})
export class AppModule { }
