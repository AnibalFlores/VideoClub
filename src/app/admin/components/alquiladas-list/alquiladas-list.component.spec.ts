import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquiladasListComponent } from './alquiladas-list.component';

describe('AlquiladasListComponent', () => {
  let component: AlquiladasListComponent;
  let fixture: ComponentFixture<AlquiladasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquiladasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlquiladasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
