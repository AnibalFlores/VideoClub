import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeditorComponent } from './filmeditor.component';

describe('FilmeditorComponent', () => {
  let component: FilmeditorComponent;
  let fixture: ComponentFixture<FilmeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
