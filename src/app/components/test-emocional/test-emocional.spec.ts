import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEmocional } from './test-emocional';

describe('TestEmocional', () => {
  let component: TestEmocional;
  let fixture: ComponentFixture<TestEmocional>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestEmocional]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestEmocional);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
