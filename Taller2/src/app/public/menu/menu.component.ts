import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-menu',
  imports: [RouterLink, FooterComponent, HomeComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
