import { PokemonStore } from './../../store/pokemon.store';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  protected pokemonStore = inject(PokemonStore);
  pokemonD: any = this.pokemonStore.pokemonDetails()
  pokemon: any = this.pokemonStore.requestPokemons()
  private route = inject(ActivatedRoute);
  private PokemonStore = inject(PokemonStore);
  public pokemonDetails: any;
  public name: any;

  constructor() {
    this.pokemonStore.loadRequestPokemons(this.route.snapshot.params['name'])

  }

  ngOnInit(): void {
    // Get ID from route
    this.name = Number(this.route.snapshot.paramMap.get('id'));

    if (this.name) {
      // Fetch Pokémon details
      this.pokemon = this.pokemonD.find((item: any) => item.id === this.name)

      this.PokemonStore.FindDetailsPokemons(this.name)
    }
  }
}
