import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTaskComponent } from './save-task.component';

describe('SaveTaskComponent', () => {
  let component: SaveTaskComponent;
  let fixture: ComponentFixture<SaveTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
