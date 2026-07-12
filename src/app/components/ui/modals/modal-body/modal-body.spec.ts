import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { ModalBody } from './modal-body';
import { ModalComponent } from '../modal-component/modal-component';

vi.mock('bootstrap', () => {
  return {
    Modal: vi.fn().mockImplementation(function () {
      return { show: vi.fn(), hide: vi.fn(), dispose: vi.fn() };
    }),
  };
});

@Component({
  standalone: true,
  imports: [ModalComponent, ModalBody],
  template: `
    <app-modal-component>
      <app-modal-body cssClass="minha-classe" />
    </app-modal-component>
  `,
})
class HostTestComponent {}

describe('ModalBody', () => {
  let fixture: ComponentFixture<HostTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostTestComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const body = fixture.debugElement.query(
      (de) => de.componentInstance instanceof ModalBody
    );
    expect(body).toBeTruthy();
  });
});