import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActionBarComponent } from './dialog-action-bar.component';

describe('DialogActionBarComponent', () => {
  let component: DialogActionBarComponent;
  let fixture: ComponentFixture<DialogActionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActionBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
