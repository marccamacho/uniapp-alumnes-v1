import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetmanaComponent } from './setmana.component';

describe('SetmanaComponent', () => {
  let component: SetmanaComponent;
  let fixture: ComponentFixture<SetmanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetmanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetmanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
