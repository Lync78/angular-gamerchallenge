import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from "../../core/services/auth.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesome } from '../../core/services/font-awesome';

@Component({
  imports: [FontAwesomeModule, RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {

  constructor(private router: Router){}

  readonly icons = inject(FontAwesome);

  readonly error = signal<string>("");

  readonly auth = inject(Auth);

  readonly isMenuOpen = signal(false);

  closeMenu(){
    return this.isMenuOpen.set(false);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(currentValue => !currentValue);
  }
  
  logout(): void {
    this.auth.logout().subscribe({
      next: () => {
          this.router.navigate(['/login']);
        },
        error: () => {
          this.error.set("Identifiants incorrects");
        }
    })
  }
}
