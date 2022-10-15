import { TestBed } from '@angular/core/testing';

import { LayoutObserver } from './layout-observer.service';

describe('LayoutObserverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayoutObserver = TestBed.inject(LayoutObserver);
    expect(service).toBeTruthy();
  });
});
