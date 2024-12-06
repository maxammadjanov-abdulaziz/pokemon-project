import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { PokemonItemRes } from "./pokemon.type";

@Injectable({
    providedIn: 'root'
})

export class PokemonService {
    #API_URL = 'https://pokeapi.co/api/v2/pokemon';  // Убираем лишние пробелы
    #http = inject(HttpClient);

    getPokemons(payload: any): Observable<any> {
        console.log(payload);

        // Используем один из вариантов запроса
        return this.#http.get(`${this.#API_URL}?limit=10`);  // Получаем 4 покемонов
    }


    id(id: number): Observable<any> {
        return this.#http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    }


    getPokemonDetails(name: string): Observable<PokemonItemRes> {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        return this.#http.get<PokemonItemRes>(url); // Указываем тип данных, возвращаемых из запроса
    }
}

