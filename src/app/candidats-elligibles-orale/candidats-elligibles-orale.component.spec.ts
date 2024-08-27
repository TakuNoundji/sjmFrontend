import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatsElligiblesOraleComponent } from './candidats-elligibles-orale.component';

describe('CandidatsElligiblesOraleComponent', () => {
  let component: CandidatsElligiblesOraleComponent;
  let fixture: ComponentFixture<CandidatsElligiblesOraleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatsElligiblesOraleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatsElligiblesOraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
