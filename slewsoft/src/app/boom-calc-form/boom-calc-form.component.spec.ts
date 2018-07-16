import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoomCalcFormComponent } from './boom-calc-form.component';

describe('BoomCalcFormComponent', () => {
  let component: BoomCalcFormComponent;
  let fixture: ComponentFixture<BoomCalcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoomCalcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoomCalcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
