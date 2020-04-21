import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookSidebarComponent } from './notebook-sidebar.component';

describe('NotebookSidebarComponent', () => {
  let component: NotebookSidebarComponent;
  let fixture: ComponentFixture<NotebookSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotebookSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebookSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
