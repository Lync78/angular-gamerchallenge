import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengePage } from './challenge-page';

describe('ChallengePage', () => {
  let component: ChallengePage;
  let fixture: ComponentFixture<ChallengePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
