import { TestBed } from '@angular/core/testing';

import { EstadoItemService } from './estado-item.service';

describe('EstadoItemService', () => {
  let service: EstadoItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
