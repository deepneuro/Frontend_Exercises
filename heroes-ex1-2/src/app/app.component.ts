import { Component, QueryList, ContentChildren, OnInit, Input } from '@angular/core';
import { ListaComponent } from './lista/lista.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // signupForm: FormGroup;
  // @ContentChildren(ListaComponent)
  // buttons: QueryList<ListaComponent>;

  @Input() herooo;
  ngOnInit() {

  }
}
