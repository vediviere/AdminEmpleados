import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotpagefoundComponent } from './notpagefound.component';

describe('NotpagefoundComponent', () => {
  let component: NotpagefoundComponent;
  let fixture: ComponentFixture<NotpagefoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotpagefoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotpagefoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
