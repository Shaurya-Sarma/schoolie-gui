import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayItemComponent } from './holiday-item.component';

describe('HolidayItemComponent', () => {
  let component: HolidayItemComponent;
  let fixture: ComponentFixture<HolidayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
