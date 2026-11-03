import { Component, signal, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesome } from '../../core/services/font-awesome';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FontAwesomeModule, RouterLink],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  readonly icons = inject(FontAwesome);
  private date = new Date();
  readonly yearCurrent = signal(this.date.getFullYear());
}
