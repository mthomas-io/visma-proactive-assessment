import type {
  CharacterDetailComposable,
  CharacterListComposable,
  RickMortyDetailResponse,
  RickMortyListResponse,
  UniverseCharacter,
  UniverseListItem,
} from './types'

export function useRickAndMortyCharacters() {
  const pageNumber = useState(() => 1)
  const pageSize = useState(() => 20) // not actually configurable for rick and morty api

  const { data, ...rest } = useRickAndMortyData<RickMortyListResponse>('character', {
    query: computed(() => ({ page: pageNumber.value })),
  })

  // Same workaround as in Pokemon
  watch(pageNumber, () => {
    if (pageNumber.value === 1) {
      rest.clear()
      rest.refresh()
    }
  })

  const totalItems = computed<number>(() => data.value?.info.count || 0)

  const characters = computed<UniverseListItem[] | null>(() => {
    if (!data.value) {
      return null
    }

    return data.value.results.map((item) => {
      // omit trailing slash
      const detailUrl = new URL(item.url.replace(/\/$/, ''))
      const id = detailUrl.pathname.split('/').at(-1)

      if (!id) {
        throw new Error(`API returned invalid pokemon url ${item.url}`)
      }

      return {
        id,
        name: item.name,
        imgUrl: item.image,
      }
    })
  })

  return {
    ...rest,
    data: characters,
    pageNumber,
    pageSize,
    totalItems,
  } as CharacterListComposable
}

export function useRickAndMortyCharacter(id: MaybeRefOrGetter<string>) {
  const { data, ...rest } = useRickAndMortyData<RickMortyDetailResponse>(`character/${id}`)

  const character = computed<UniverseCharacter | null>(() => {
    if (!data.value) {
      return null
    }

    return {
      id: `${data.value.id}`,
      name: data.value.name,
      imgUrl: data.value.image,
      description: `${data.value.name} is a ${data.value.gender} ${data.value.species} appearing in ${data.value.episode.length} episodes. They're originally from ${data.value.origin.name} and their current location is ${data.value.location.name}.`,
      characteristics: {
        Name: data.value.name,
        Species: data.value.species,
        Status: data.value.status,
        Type: data.value.type || 'unkown',
        Gender: data.value.gender,
        Origin: data.value.origin.name,
        Location: data.value.location.name,
        Episodes: `${data.value.episode.length}`,
      },
    }
  })

  return { ...rest, data: character } as CharacterDetailComposable
}
