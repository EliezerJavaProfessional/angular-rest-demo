import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserAccountComponent } from './form-user-account.component';

describe('FormUserAccountComponent', () => {
  let component: FormUserAccountComponent;
  let fixture: ComponentFixture<FormUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUserAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
