import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifsService) { }

  search(): void {
    const searchTerm = this.searchInput.nativeElement.value;
    if (searchTerm.trim().length === 0) { return; }
    this.gifService.searchGifs(searchTerm);
    this.searchInput.nativeElement.value = '';
  }
}
