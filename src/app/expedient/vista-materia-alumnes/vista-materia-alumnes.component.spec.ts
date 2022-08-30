import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaMateriaAlumnesComponent } from './vista-materia-alumnes.component';

describe('VistaMateriaAlumnesComponent', () => {
  let component: VistaMateriaAlumnesComponent;
  let fixture: ComponentFixture<VistaMateriaAlumnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaMateriaAlumnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaMateriaAlumnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
