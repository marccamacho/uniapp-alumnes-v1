import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaExpedientComponent } from './vista-expedient.component';

describe('VistaExpedientComponent', () => {
  let component: VistaExpedientComponent;
  let fixture: ComponentFixture<VistaExpedientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaExpedientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaExpedientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
