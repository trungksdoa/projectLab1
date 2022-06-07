import { TestBed } from '@angular/core/testing';

import { ImageAPIService } from './image-api.service';

describe('ImageAPIService', () => {
  let service: ImageAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
