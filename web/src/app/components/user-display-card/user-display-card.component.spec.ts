import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDisplayCardComponent } from './user-display-card.component';

describe('UserDisplayCardComponent', () => {
  let component: UserDisplayCardComponent;
  let fixture: ComponentFixture<UserDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDisplayCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
