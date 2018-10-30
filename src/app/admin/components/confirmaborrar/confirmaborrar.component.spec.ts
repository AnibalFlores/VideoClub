import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaborrarComponent } from './confirmaborrar.component';

describe('ConfirmaborrarComponent', () => {
  let component: ConfirmaborrarComponent;
  let fixture: ComponentFixture<ConfirmaborrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaborrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaborrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
