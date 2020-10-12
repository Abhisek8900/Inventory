import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MylistitemComponent } from './mylistitem.component';

describe('MylistitemComponent', () => {
  let component: MylistitemComponent;
  let fixture: ComponentFixture<MylistitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MylistitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MylistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
