import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesLazyloadComponent } from './images-lazyload.component';

describe('ImagesLazyloadComponent', () => {
  let component: ImagesLazyloadComponent;
  let fixture: ComponentFixture<ImagesLazyloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesLazyloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesLazyloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
