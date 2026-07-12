import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ModalHeader } from './modal-header';
import { ModalComponent } from '../modal-component/modal-component';

@Component({
  standalone: true,
  imports: [ModalComponent, ModalHeader],
  template: `
    <app-modal-component>
      <app-modal-header title="Título de teste" />
    </app-modal-component>
  `,
})
class HostTestComponent {}

describe('ModalHeader', () => {
  let fixture: ComponentFixture<HostTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostTestComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const header = fixture.debugElement.query(
      (de) => de.componentInstance instanceof ModalHeader
    );
    expect(header).toBeTruthy();
  });
});