import type { AsyncData, NuxtError } from '#app'

// A common type that each universe should return for overview pages
export interface UniverseListItem {
  id: string
  name: string
  imgUrl?: string
}

// A common type that each universe should return for detail pages
export interface UniverseCharacter extends UniverseListItem {
  description?: string
  characteristics: Record<string, string>
}

export type CharacterListComposable = AsyncData<UniverseListItem[] | null, NuxtError<unknown>> & { pageNumber: Ref<number>, pageSize: Ref<number>, totalItems: ComputedRef<number> }
export type CharacterDetailComposable = AsyncData<UniverseCharacter | null, NuxtError<unknown>>

// Basically the 'contract' each universe must implement
export interface UniverseConfig {
  slug: string
  name: string
  useCharacters: () => CharacterListComposable
  useCharacter: (id: MaybeRefOrGetter<string>) => CharacterDetailComposable
}
