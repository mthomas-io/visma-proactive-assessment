import type { UniverseConfig } from './types/universe.types'
import { usePokemonCharacter, usePokemonCharacters } from './pokemon'
import { useRickAndMortyCharacter, useRickAndMortyCharacters } from './rickmorty'

// Register any universe here
export const universes: UniverseConfig[] = [
  {
    slug: 'pokemon',
    name: 'Pokémon',
    useCharacters: usePokemonCharacters,
    useCharacter: id => usePokemonCharacter(id),
  },
  {
    slug: 'rick-and-morty',
    name: 'Rick and Morty',
    useCharacters: useRickAndMortyCharacters,
    useCharacter: id => useRickAndMortyCharacter(id),
  },
]

export function useUniverse(slug: MaybeRefOrGetter<string>) {
  return computed(() => universes.find(universe => universe.slug === toValue(slug)) ?? null)
}

export function useUniverseNavLinks() {
  const navLinks = computed(() => universes.map(universe => ({
    label: universe.name,
    to: `/${universe.slug}`,
  })))

  return { navLinks }
}
