import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonsPrincipalsComponent } from './botons-principals.component';

describe('BotonsPrincipalsComponent', () => {
  let component: BotonsPrincipalsComponent;
  let fixture: ComponentFixture<BotonsPrincipalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonsPrincipalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonsPrincipalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
