import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUpdatePasswordComponent } from './profile-update-password.component';

describe('ProfileUpdatePasswordComponent', () => {
  let component: ProfileUpdatePasswordComponent;
  let fixture: ComponentFixture<ProfileUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUpdatePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
