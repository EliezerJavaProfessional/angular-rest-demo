import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserMessageComponent } from './form-user-message.component';

describe('FormUserMessageComponent', () => {
  let component: FormUserMessageComponent;
  let fixture: ComponentFixture<FormUserMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUserMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUserMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
