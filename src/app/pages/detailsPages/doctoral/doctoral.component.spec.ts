import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoralComponent } from './doctoral.component';

describe('DoctoralComponent', () => {
  let component: DoctoralComponent;
  let fixture: ComponentFixture<DoctoralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctoralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
