import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoginContentComponent } from './pre-login-content.component';

describe('PreLoginContentComponent', () => {
  let component: PreLoginContentComponent;
  let fixture: ComponentFixture<PreLoginContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreLoginContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreLoginContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
