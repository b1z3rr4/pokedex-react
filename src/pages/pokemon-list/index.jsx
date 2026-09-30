import { PokemonModal } from "@/components/features/pokemon-modal";
import "./styles.css";

import { PokemonCard } from "@/components/modules/pokemon-card";
import { getPokemonStat } from "@/utils/get-pokemon-stat";
import { useState } from "react";
import { useEffect } from "react";
import { Header } from "@/components/features/header";
import { useMemo } from "react";
import { useCallback } from "react";
import { usePokemonList } from "@/queries/use-pokemon-list";

const pokemonKey = "pokemonSelecionado"

export function PokemonList() {    
  const pokemonList = usePokemonList();
  
  const [selectedTypeFilter, setSelectedFilter] = useState('accent');

  const [selectedPokemon, setSelectedPokemon] = useState(() => {
    const pokemonStorage = localStorage.getItem(pokemonKey);
    if (pokemonStorage) {
      return JSON.parse(pokemonStorage);
    }

    return null;
  });

  const pokemonListFiltered = useMemo(() => {
    if (selectedTypeFilter === 'accent') return pokemonList;
    
    return pokemonList.filter((p) => {
      return p.types.some((t) => t.type.name === selectedTypeFilter);
    }) ?? [];
  }, [pokemonList, selectedTypeFilter]);

  const handleTypeFilter = useCallback((type) => {
    setSelectedFilter(type);
  }, [])

  useEffect(() => {
    localStorage.setItem(pokemonKey, JSON.stringify(selectedPokemon));
  }, [selectedPokemon]);

  return (
    <div className="pokemon-list-root">
      <Header selectedType={selectedTypeFilter} onTypeChange={handleTypeFilter} />
      
      <main className="pokemon-list-main">
        <div className="pokemon-list-grid">
          {pokemonListFiltered?.map((pokemon) => ( // Optional Chain
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
