import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWalletMoneyComponent } from './add-wallet-money.component';

describe('AddWalletMoneyComponent', () => {
  let component: AddWalletMoneyComponent;
  let fixture: ComponentFixture<AddWalletMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWalletMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWalletMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
