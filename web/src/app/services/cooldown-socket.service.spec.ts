import { TestBed } from '@angular/core/testing';

import { CooldownSocketService } from './cooldown-socket.service';

describe('CounterSocketService', () => {
  let service: CooldownSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooldownSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
