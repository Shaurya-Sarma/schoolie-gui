import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookMainComponent } from './notebook-main.component';

describe('NotebookMainComponent', () => {
  let component: NotebookMainComponent;
  let fixture: ComponentFixture<NotebookMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotebookMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebookMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
