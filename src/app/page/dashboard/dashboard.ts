import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  selectedMenu = 'admin';

  setActive(menu: string, event: MouseEvent) {
    event.preventDefault();
    this.selectedMenu = menu;
  }
}
