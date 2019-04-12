import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesStartComponent } from './heroes-start.component';

describe('HeroesStartComponent', () => {
  let component: HeroesStartComponent;
  let fixture: ComponentFixture<HeroesStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
