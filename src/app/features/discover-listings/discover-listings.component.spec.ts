import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverListingsComponent } from './discover-listings.component';

describe('DiscoverListingsComponent', () => {
  let component: DiscoverListingsComponent;
  let fixture: ComponentFixture<DiscoverListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverListingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscoverListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
