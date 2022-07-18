import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSliderComponent } from './signup-slider.component';

describe('SignupSliderComponent', () => {
  let component: SignupSliderComponent;
  let fixture: ComponentFixture<SignupSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
