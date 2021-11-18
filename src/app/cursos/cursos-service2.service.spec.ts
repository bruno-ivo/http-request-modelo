import { TestBed } from '@angular/core/testing';

import { CursosService2Service } from './cursos-service2.service';

describe('CursosService2Service', () => {
  let service: CursosService2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosService2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
