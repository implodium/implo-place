import { TestBed } from '@angular/core/testing';

import { ServerEnvironmentService } from './server-environment.service';

describe('ServerEnvironmentService', () => {
  let service: ServerEnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerEnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
