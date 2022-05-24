import { TestBed } from '@angular/core/testing';

import { ConnectedUserSocketService } from './connected-user-socket.service';

describe('ConnectedPlayerService', () => {
  let service: ConnectedUserSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectedUserSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
