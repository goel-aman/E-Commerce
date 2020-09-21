import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditformcomponentComponent } from './editformcomponent.component';

describe('EditformcomponentComponent', () => {
  let component: EditformcomponentComponent;
  let fixture: ComponentFixture<EditformcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditformcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditformcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
