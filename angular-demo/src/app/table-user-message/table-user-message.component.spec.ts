import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUserMessageComponent } from './table-user-message.component';

describe('TableUserMessageComponent', () => {
  let component: TableUserMessageComponent;
  let fixture: ComponentFixture<TableUserMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableUserMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUserMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
