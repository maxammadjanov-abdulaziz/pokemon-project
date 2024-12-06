import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() pokemon: any

  private router = inject(Router)
  private route = inject(ActivatedRoute)

  hondleNav(name: string) {
    this.router.navigate(['/details', name], { relativeTo: this.route })
  }
}


