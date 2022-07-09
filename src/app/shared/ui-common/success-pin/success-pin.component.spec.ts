import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPinComponent } from './success-pin.component';

describe('SuccessPinComponent', () => {
  let component: SuccessPinComponent;
  let fixture: ComponentFixture<SuccessPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessPinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
