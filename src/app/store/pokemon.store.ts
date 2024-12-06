// import { PokemonService } from './../service/pokemon.service';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { forkJoin, pipe, map } from 'rxjs';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { tapResponse } from '@ngrx/operators';
import { inject } from "@angular/core";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PokemonService } from '../service/pokemon.service';



interface pokemonState {
    pokemonData: Array<{
        name: string;
        url: string;
    }>
    // pokemonDetails: Array<{
    //     name: string;
    //     height: number;
    //     id: number;
    //     base_experience: number;
    // }>
    pokemonDetails: any
    FindDetails: any
    requestPokemons: any
}


const initialState: pokemonState = {
    pokemonData: [],
    pokemonDetails: [],
    FindDetails: {},
    requestPokemons: {}
};

export const PokemonStore = signalStore({ providedIn: 'root' },
    withState(initialState),  // Используем initialState, которое уже определено
    withMethods((store, pokemonService = inject(PokemonService)) => {

        const loadAllPokemons = rxMethod<any>(pipe(
            tap(() => patchState(store, { pokemonData: [] })),  // Очищаем перед загрузкой
            switchMap((payload) =>
                pokemonService.getPokemons(payload).pipe(
                    tapResponse({
                        next: (res: any) => {
                            console.log(res);
                            patchState(store, {
                                pokemonData: res.results.map((pokemon: any) => ({
                                    name: pokemon.name,
                                    url: pokemon.url,
                                    // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`
                                }))
                            });
                        },
                        error: (error: any) => {
                            console.error('Error loading pokemons:', error);
                        }
                    })
                )
            )
        ));

        const FindDetailsPokemons = rxMethod<any>(pipe(
            tap(() => patchState(store, { FindDetails: [] })),  // Сбрасываем состояние FindDetails
            switchMap((nameOrId: any) => {
                console.log(nameOrId);  // Проверяем, что передается

                if (typeof nameOrId === 'string') {
                    return pokemonService.getPokemonDetails(nameOrId);
                } else if (typeof nameOrId === 'number') {
                    return pokemonService.id(nameOrId);
                } else {
                    throw new Error('Expected name or id');
                }
            }),
            tap((details: any) => {
                patchState(store, { FindDetails: details });
            })
        ));

        const loadAllPakemonsDetails = rxMethod<any>(pipe(
            tap(() => patchState(store, { pokemonDetails: [] })),  // Очищаем перед загрузкой
            switchMap((list) =>
                forkJoin(
                    list.map((item: any) => pokemonService.getPokemonDetails(item.name))
                ).pipe(map((res) => {
                    if (res) {
                        patchState(store, {
                            pokemonDetails: res
                        })
                    }
                })

                )

            )
        ));

        // const requestPokemons = rxMethod<any>(pipe(
        //     tap(() => patchState(store, { pokemonDetails: {} })),
        //     switchMap((name) =>
        //         forkJoin(
        //             name.map((item: any) => PokemonService.getPokemonDetails(item.name))
        //         ).pipe(map((res) => {
        //             if (res) {
        //                 patchState(store, {
        //                     pokemonDetails: res
        //                 })
        //             }
        //         }))
        //     )
        // ))

        const loadRequestPokemons = rxMethod<any>(pipe(
            tap(() => patchState(store, { pokemonData: [] })),  // Очищаем перед загрузкой
            switchMap((name) =>
                pokemonService.getPokemonDetails(name).pipe(
                    tapResponse({
                        next: (res: any) => {
                            console.log(res);
                            patchState(store, {
                                requestPokemons: res
                            })
                        },
                        error: (error: any) => {
                            console.error('Error loading pokemons:', error);
                        }
                    })
                )
            )
        ));

        return {
            loadAllPokemons,
            loadAllPakemonsDetails,
            FindDetailsPokemons,
            loadRequestPokemons
        };
    })
);
