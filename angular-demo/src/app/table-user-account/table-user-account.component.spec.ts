import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUserAccountComponent } from './table-user-account.component';

describe('TableUserAccountComponent', () => {
  let component: TableUserAccountComponent;
  let fixture: ComponentFixture<TableUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableUserAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
