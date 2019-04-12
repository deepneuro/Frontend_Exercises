import { FormComponent } from './forms/form/form.component';
import { FormsComponent } from './forms/forms.component';
import { HeaderComponent } from './header/header.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent }       from './lista/lista.component';
import { CardsComponent }       from './cards/cards.component';
import { HeroesStartComponent }   from './heroes-start/heroes-start.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },

  // { path: 'header', component: HeaderComponent},

  { path: 'lista', component: ListaComponent, children: [
    { path: 'start', component: HeroesStartComponent }] },

  { path: 'cards', component: CardsComponent},

  { path: 'forms', component: FormsComponent, children: [
    { path: ':id', component: FormComponent }
  ] },
  // { path: '', component: HeaderComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}