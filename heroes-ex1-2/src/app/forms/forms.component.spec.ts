import { FormsComponent } from './../forms/forms.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from './../data.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';


describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [FormsComponent],
  //     imports: [ReactiveFormsModule, RouterTestingModule],
  //     providers: [DataService]
  //   });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [DataService]
    });

    fixture = TestBed.createComponent(FormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    });

  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit(); // call the ngOnInit method of our component class
    expect(component.signupForm instanceof FormGroup).toBe(true); // test that the formGroup attribute of the class is an instance of a signupForm
  });

  it('should create a main FormGroup', () => {
    component.ngOnInit();
    expect(Object.keys(component.signupForm.controls)).toEqual([
        'userData'
    ]);
  });

  it('should create a FormGroup for each topic', () => {
    component.ngOnInit();
    let userData = component.signupForm.controls.userData;
    expect(Object.keys(userData['controls'])).toEqual([
      'name', 'email', 'phone', 'hobbies'
    ]);
  });

  it('should return true if the email form control is required', () => {
    component.ngOnInit();
    let userData = component.signupForm.controls.userData;
    expect(userData['controls']['email']['errors']['required']).toBe(true);
  });

  it('should set the value to a version of our form values', () => {
    component.ngOnInit();
    component.herooo = {
            name: '',
            email: '',
            phone: '',
            hobbies: [],
            id: -1
        };

    component.signupForm.patchValue({
      userData: {
        name: 'tiago',
        email: 'email@as.com',
        phone: '14564654',
        hobbies: [],
       }
      }
    );

    expect(component.signupForm.get('userData.name').value).toEqual('tiago');
  });

  it('should set form values and insert it to our service version', () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let serviceArray = dataService.onloadData('http://localhost:4200/Hero');
    fixture.detectChanges();

    component.ngOnInit();

    component.signupForm.patchValue({
      userData: {
        name: 'newHero',
        email: 'email@as.com',
        phone: '14564654',
        hobbies: [],
       }
      }
    );

    component.herooo = {
      name: '',
      email: '',
      phone: '',
      hobbies: [],
      id: serviceArray.length
  };

    component.onSubmit();
    let heroes = dataService.onloadData('http://localhost:4200/Hero');

    // expect(serviceArray[serviceArray.length - 1].name).toEqual(heroes[heroes.length-1].name);
    expect(serviceArray[serviceArray.length - 1].name).toEqual('newHero');
  });

  it('should set form values and edit it on our service version', () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let serviceArray = dataService.onloadData('http://localhost:4200/Hero');
    fixture.detectChanges();

    component.ngOnInit();

    component.signupForm.patchValue({
      userData: {
        name: 'hulk',
        email: 'email@as.com',
        phone: '14564654',
        hobbies: [],
       }
      }
    );

    component.herooo = {
      name: '',
      email: '',
      phone: '',
      hobbies: [],
      id: 4
  };

    component.onSubmit();
    expect(serviceArray[3].name).toEqual('hulk');
  });
});











// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormGroup } from '@angular/forms';

// import { FormsComponent } from './forms.component';

// describe('FormsComponent', () => {
//   let component: FormsComponent;
//   let fixture: ComponentFixture<FormsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ FormsComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FormsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // it('should create a FormGroup comprised of FormControls', () => {
//   //   component.ngOnInit();
//   //   expect(component.formGroup instanceof FormGroup).toBe(true);
//   // });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
