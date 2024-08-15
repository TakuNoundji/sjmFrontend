import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterActivityComponent } from './footer-activity.component';

describe('FooterActivityComponent', () => {
  let component: FooterActivityComponent;
  let fixture: ComponentFixture<FooterActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
