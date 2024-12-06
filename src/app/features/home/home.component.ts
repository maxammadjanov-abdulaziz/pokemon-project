import { Component, inject } from '@angular/core';
import { PokemonStore } from '../../store/pokemon.store';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected readonly pokemonStore = inject(PokemonStore);
  title = 'pokemon-angular';

  constructor() {
    // Загружаем покемонов при инициализации
    this.pokemonStore.loadAllPokemons({ offset: 0, limit: 10 });
    this.pokemonStore.loadAllPakemonsDetails(this.pokemonStore.pokemonData)
    // console.log(this.pokemonStore.pokemonDetails(), "log")
    // this.pokemonStore.pokemonDetails()

  }
  loadAllPakemonsDetails(name: string) {
  }

  // Получаем данные покемонов из store
  get pokemons() {
    return this.pokemonStore.pokemonData;

  }
}
