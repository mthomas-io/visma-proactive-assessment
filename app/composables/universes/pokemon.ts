import type {
  CharacterDetailComposable,
  CharacterListComposable,
  PokemonDetailResponse,
  PokemonListResponse,
  UniverseCharacter,
  UniverseListItem,
} from './types'

export function usePokemonCharacters() {
  const pageNumber = useState(() => 1)
  const pageSize = useState(() => 20) // default for pokeapi

  const { data, ...rest } = usePokemonData<PokemonListResponse>('pokemon', {
    query: computed(() => ({ offset: (pageNumber.value - 1) * pageSize.value, limit: pageSize.value })),
  })

  // This is a workaround for the fact that API Party contains a bug that doesn't return the first cached page a second time.
  // https://github.com/johannschopplich/nuxt-api-party/issues/14
  // https://github.com/johannschopplich/nuxt-api-party/issues/91
  watch(pageNumber, () => {
    // If first page is being requested, omit cache regardless of whether it's already cached
    if (pageNumber.value === 1) {
      rest.clear()
      rest.refresh()
    }
  })

  const totalItems = computed<number>(() => data.value?.count || 0)

  // I would be doing this data parsing in usePokemonData's `transform` method,
  // but with API Party transform() gets called with the already transformed/ cached data when it's called a second time.
  // It also is typed for the Input and Output to be of the same type, basically rendering the transform method useless..
  // https://github.com/johannschopplich/nuxt-api-party/issues/49
  const characters = computed<UniverseListItem[] | null>(() => {
    const response = toValue(data)
    if (!response) {
      return null
    }

    return response.results.map((item) => {
      // omit trailing slash
      const detailUrl = new URL(item.url.replace(/\/$/, ''))
      const id = detailUrl.pathname.split('/').at(-1)

      if (!id) {
        throw new Error(`API returned invalid pokemon url ${item.url}`)
      }

      return {
        id,
        name: item.name,
        imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      }
    })
  })

  return {
    ...rest,
    data: characters,
    pageNumber,
    pageSize,
    totalItems,
    // To do: type AsyncData correctly so we don't need type assertions for the composables
  } as CharacterListComposable
}

export function usePokemonCharacter(id: MaybeRefOrGetter<string>) {
  const { data, ...rest } = usePokemonData<PokemonDetailResponse>(`pokemon/${id}`)

  const character = computed<UniverseCharacter | null>(() => {
    if (!data.value) {
      return null
    }

    return {
      id: `${data.value.id}`,
      name: data.value.name,
      imgUrl: data.value.sprites.front_default,
      description: `${data.value.name.slice(0, 1).toUpperCase()}${data.value.name.slice(1)} (species ${data.value.species.name}) weighs in at ${data.value.weight / 10}kg, and has a height of ${data.value.height / 10}m, they know ${data.value.moves.length} different moves!`,
      // Create key/values from primitive types to be displayed as a table
      characteristics: {
        'Name': data.value.name,
        'Species': data.value.species.name,
        'Type': data.value.types.map(type => type.type.name).join(', '),
        'Height': `${data.value.height / 10} m`,
        'Weight': `${data.value.weight / 10} kg`,
        'Base Experience': `${data.value.base_experience}`,
        'Form': data.value.forms.map(form => form.name).join(', '),
        'Moves': data.value.moves.map(move => move.move.name).join(', '),
      },
    }
  })

  return { ...rest, data: character } as CharacterDetailComposable
}
