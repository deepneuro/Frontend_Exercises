import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { DataService } from 'src/app/data.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the hero name from the service', () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
    expect(dataService.onloadData('http://localhost:4200/Hero')[0].name).toEqual(component.hero[0].name);
  });

  it('should use the hero email from the service', () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
    expect(dataService.onloadData('http://localhost:4200/Hero')[0].email).toEqual(component.hero[0].email);
  });

  it('should use the hero phone from the service', () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();

    expect(dataService.onloadData('http://localhost:4200/Hero')[0].phone).toEqual(component.hero[0].phone);
  });

  it('should fetch data successfully if called asynchronously', async( () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'onloadData')
    .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      expect(component.data).toBe(undefined);
  });

  })
  );
});


