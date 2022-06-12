import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPaypal } from './test-paypal.component';

describe('TestPaypalComponent', () => {
  let component: PaymentPaypal;
  let fixture: ComponentFixture<PaymentPaypal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPaypal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPaypal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
