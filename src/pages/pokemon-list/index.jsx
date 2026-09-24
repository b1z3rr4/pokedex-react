import { PokemonModal } from "@/components/features/pokemon-modal";
import "./styles.css";

import { PokemonCard } from "@/components/modules/pokemon-card";
import { pokemons } from "@/mocks/pokemons";
import { getPokemonStat } from "@/utils/get-pokemon-stat";
import { useState } from "react";

export function PokemonList() {    
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Falsy -> false

  return (
    <div className="pokemon-list-root">
      <main className="pokemon-list-main">
        <div className="pokemon-list-grid">
          {pokemons.map((pokemon) => (
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
