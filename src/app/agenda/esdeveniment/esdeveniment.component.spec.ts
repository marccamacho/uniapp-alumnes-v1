import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsdevenimentComponent } from './esdeveniment.component';

describe('EsdevenimentComponent', () => {
  let component: EsdevenimentComponent;
  let fixture: ComponentFixture<EsdevenimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsdevenimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsdevenimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
