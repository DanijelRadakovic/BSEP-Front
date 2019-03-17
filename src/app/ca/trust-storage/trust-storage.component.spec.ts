import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustStorageComponent } from './trust-storage.component';

describe('TrustStorageComponent', () => {
  let component: TrustStorageComponent;
  let fixture: ComponentFixture<TrustStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
