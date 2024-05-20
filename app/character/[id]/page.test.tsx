import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { fetchCharacter } from './page'

// Configura el servidor de MSW para interceptar las solicitudes de red
const server = setupServer(
  http.get('https://rickandmortyapi.com/api/character/:id', (req) => {
    const { id } = req.params
    return HttpResponse.json({
      id,
      name: 'Rick Sanchez',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      type: '',
      origin: { name: 'Earth (C-137)' },
      gender: 'Male',
      status: 'Alive',
      species: 'Human',
    })
  }),
)

// Configura MSW y limpia después de cada prueba
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('fetchCharacter obtiene los datos correctos', async () => {
  const character = await fetchCharacter('1')
  expect(character).toEqual({
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    type: '',
    origin: { name: 'Earth (C-137)' },
    gender: 'Male',
    status: 'Alive',
    species: 'Human',
  })
})
