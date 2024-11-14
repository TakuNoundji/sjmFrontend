import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatsEliminesComponent } from './candidats-elimines.component';

describe('CandidatsEliminesComponent', () => {
  let component: CandidatsEliminesComponent;
  let fixture: ComponentFixture<CandidatsEliminesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatsEliminesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatsEliminesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
