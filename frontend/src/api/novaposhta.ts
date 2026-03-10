const staticCities = ['Київ', 'Львів', 'Одеса', 'Дніпро', 'Івано-Франківськ', 'Вінниця']

const staticBranches: Record<string, string[]> = {
  Київ: ['Відділення №12', 'Поштомат №41', 'Відділення №88'],
  Львів: ['Відділення №7', 'Поштомат №18', 'Відділення №22'],
  Одеса: ['Відділення №3', 'Відділення №14', 'Поштомат №9'],
  Дніпро: ['Відділення №11', 'Поштомат №12'],
  'Івано-Франківськ': ['Відділення №5', 'Відділення №13'],
  Вінниця: ['Відділення №2', 'Поштомат №4'],
}

export const getCities = async (query: string) =>
  staticCities.filter((city) => city.toLowerCase().includes(query.toLowerCase()))

export const getWarehouses = async (city: string) => staticBranches[city] ?? []
