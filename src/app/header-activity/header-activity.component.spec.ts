import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderActivityComponent } from './header-activity.component';

describe('HeaderActivityComponent', () => {
  let component: HeaderActivityComponent;
  let fixture: ComponentFixture<HeaderActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
