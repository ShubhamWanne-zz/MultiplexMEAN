import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplexMovieComponent } from './multiplex-movie.component';

describe('MultiplexMovieComponent', () => {
  let component: MultiplexMovieComponent;
  let fixture: ComponentFixture<MultiplexMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplexMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplexMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
