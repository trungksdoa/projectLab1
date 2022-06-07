import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPaypalComponent } from './test-paypal.component';

describe('TestPaypalComponent', () => {
  let component: TestPaypalComponent;
  let fixture: ComponentFixture<TestPaypalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPaypalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
