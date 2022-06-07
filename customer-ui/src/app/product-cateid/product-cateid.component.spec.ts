import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCateidComponent } from './product-cateid.component';

describe('ProductCateidComponent', () => {
  let component: ProductCateidComponent;
  let fixture: ComponentFixture<ProductCateidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCateidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCateidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
