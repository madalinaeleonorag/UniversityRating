import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BachelorComponent } from './bachelor.component';

describe('BachelorComponent', () => {
  let component: BachelorComponent;
  let fixture: ComponentFixture<BachelorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BachelorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BachelorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
