import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterMultiSelectPipe implements PipeTransform {
  transform(items: string[], searchText: string): string[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => item.toLowerCase().includes(searchText));
  }
}
