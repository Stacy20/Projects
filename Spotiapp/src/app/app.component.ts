import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { TableInfoComponent } from "./components/table-info/table-info.component";
import { CardComponent } from "./components/card/card.component";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { HomeComponent } from "./pages/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavbarComponent, TableInfoComponent, CardComponent, SidebarComponent, HomeComponent]
})
export class AppComponent {
  title = 'Spotiapp';
}
