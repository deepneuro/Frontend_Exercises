import { FormsComponent } from './forms/forms.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { CardsComponent } from './cards/cards.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'lista', component: ListaComponent},
  { path: 'cards', component: CardsComponent},
  { path: 'forms', component: FormsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
