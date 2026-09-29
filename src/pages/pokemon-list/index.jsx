import { PokemonModal } from "@/components/features/pokemon-modal";
import "./styles.css";

import { PokemonCard } from "@/components/modules/pokemon-card";
import { getPokemonStat } from "@/utils/get-pokemon-stat";
import { useState } from "react";
import { useEffect } from "react";
import { getPokemonList } from "@/services/get-pokemon-list";
import { getPokemonByName } from "@/services/get-pokemon-by-name";

const pokemonKey = "pokemonSelecionado"

export function PokemonList() {    
  const [pokemonList, setPokemonList] = useState([]);

  const [selectedPokemon, setSelectedPokemon] = useState(() => {
    const pokemonStorage = localStorage.getItem(pokemonKey);
    if (pokemonStorage) {
      return JSON.parse(pokemonStorage);
    }

    return null;
  });

  useEffect(() => {
    console.log('rodou o useEffect!');
    localStorage.setItem(pokemonKey, JSON.stringify(selectedPokemon));
  }, [selectedPokemon]);

  useEffect(() => {
    getPokemonList().then(({ results }) => {
      return Promise.all(results.map(async (pokemon) => {
          return getPokemonByName(pokemon.name);
      }))
    }).then((data) => {
      setPokemonList(data);
    })
  }, []);

  return (
    <div className="pokemon-list-root">


      <main className="pokemon-list-main">
        <div className="pokemon-list-grid">
          {pokemonList?.map((pokemon) => ( // Optional Chain
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              sprite={pokemon.sprites.front_default}
              types={pokemon.types.map((t) => t.type.name)}
              hp={getPokemonStat(pokemon, "hp")}
              atk={getPokemonStat(pokemon, "attack")}
              def={getPokemonStat(pokemon, "defense")}
              onClick={() => setSelectedPokemon(pokemon)}
            />
          ))}
        </div>
      </main>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => {
            setSelectedPokemon(null);
          }}
        />
      )}
    </div>
  );
}
