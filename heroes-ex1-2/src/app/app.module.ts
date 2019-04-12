import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListaComponent } from './lista/lista.component';
import { CardsComponent } from './cards/cards.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroesStartComponent } from './heroes-start/heroes-start.component';
import { FormsComponent } from './forms/forms.component';
import { ServerElementComponent } from './server-element/server-element.component';
import { HeaderComponent } from './header/header.component';
import { DataService } from './data.service';
import { FormComponent } from './forms/form/form.component';




@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    CardsComponent,
    HeroesStartComponent,
    FormsComponent,
    ServerElementComponent,
    HeaderComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
