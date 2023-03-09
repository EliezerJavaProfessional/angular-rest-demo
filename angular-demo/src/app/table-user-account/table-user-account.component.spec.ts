import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountsComponent } from './table-user-account.component';

describe('UserAccountsComponent', () => {
  let component: UserAccountsComponent;
  let fixture: ComponentFixture<UserAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
