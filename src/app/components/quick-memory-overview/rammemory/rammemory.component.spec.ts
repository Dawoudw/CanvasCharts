import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RAMMemoryComponent } from './rammemory.component';

describe('RAMMemoryComponent', () => {
  let component: RAMMemoryComponent;
  let fixture: ComponentFixture<RAMMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RAMMemoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RAMMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
