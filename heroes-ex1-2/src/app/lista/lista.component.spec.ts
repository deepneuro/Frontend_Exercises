import { FormsComponent } from './../forms/forms.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from './../data.service';

import { ListaComponent } from './lista.component';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;

  // beforeEach(async(() => {
  // TestBed.configureTestingModule({
  //   declarations: [ListaComponent, FormsComponent],
  //   imports: [ReactiveFormsModule, RouterTestingModule],
  //   providers: [DataService]
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaComponent, FormsComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [DataService]
    });

    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    });
  });
  // );
// });



// describe('Component: Lista', () => {
//   let component: ListaComponent;
//   let fixture: ComponentFixture<ListaComponent>;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ListaComponent, FormsComponent],
//       imports: [ReactiveFormsModule, RouterTestingModule],
//       providers: [DataService]
//     });
//   });


//   it('should create the app', () => {
//     let fixture = TestBed.createComponent(ListaComponent);
//     let component  = fixture.debugElement.componentInstance;
//     expect(component).toBeTruthy();
//   });

//   it('should have a defined component', () => {
//     let fixture = TestBed.createComponent(ListaComponent);
//     let component  = fixture.debugElement.componentInstance;
//     expect(component).toBeDefined();
// });
// });

