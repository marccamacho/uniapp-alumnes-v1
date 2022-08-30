import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTutorComponent } from './vista-tutor.component';

describe('VistaTutorComponent', () => {
  let component: VistaTutorComponent;
  let fixture: ComponentFixture<VistaTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
