import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterMultiSelectPipe } from './custom-muliselect-pipe.component';

@Component({
  selector: 'app-custom-multiselect',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, FilterMultiSelectPipe],
  templateUrl: './custom-multiselect.component.html',
  styleUrls: ['./custom-multiselect.component.css']
})
export class CustomMultiselectComponent {
  @Input() options: string[] = [];
  @Input() selectedOptions: string[] = [];
  @Output() selectedOptionsChange = new EventEmitter<string[]>();
  selectedOptionsText: string = '';
  optionsContainerOpen: boolean | undefined;
  searchInput = '';
  filteredOptions: string[] = [];

  constructor(private elementRef: ElementRef) {
    this.optionsContainerOpen = false;
  }

  toggleOption(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }
    this.updateSelectedOptionsText();
    this.selectedOptionsChange.emit(this.selectedOptions);
  }

  removeOption(option: string) {
    this.selectedOptions = this.selectedOptions.filter(selectedOption => selectedOption !== option);
    this.updateSelectedOptionsText();
    this.selectedOptionsChange.emit(this.selectedOptions);
  }

  onInputFocus() {
    this.filterOptions();

  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

  toggleOptionsContainer() {
    this.optionsContainerOpen = true;
  }

  closeOptionsContainer() {
    this.optionsContainerOpen = false;
  }

  private updateSelectedOptionsText() {
    this.selectedOptionsText = this.selectedOptions.join(', ');
  }

  // Agrega este manejador de eventos para cerrar el contenedor cuando se hace clic fuera de él
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedElement = event.target as HTMLElement;

    // Verifica si el clic fue dentro del componente o no
    if (!this.elementRef.nativeElement.contains(clickedElement)) {
      this.closeOptionsContainer();
    }
  }
}
