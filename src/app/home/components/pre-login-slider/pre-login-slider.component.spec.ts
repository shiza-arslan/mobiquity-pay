import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoginSliderComponent } from './pre-login-slider.component';

describe('PreLoginSliderComponent', () => {
  let component: PreLoginSliderComponent;
  let fixture: ComponentFixture<PreLoginSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreLoginSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreLoginSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
