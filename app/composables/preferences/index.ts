type OverviewLayout = 'list' | 'grid'

export function usePreferences() {
  const layoutOptions: { label: string, value: OverviewLayout }[] = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ]

  const layoutPreference = useState<OverviewLayout>('overviewLayout', () => 'list')
  return {
    layoutOptions,
    layoutPreference,
  }
}
