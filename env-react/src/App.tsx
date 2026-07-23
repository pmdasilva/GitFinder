import './index.css'
import { useState } from 'react'
import { Header } from './Components/Header'
import background from './assets/github.png'
import ListUsers from './Components/ListUsers'

type GitHubUser = {
  avatar_url: string
  bio: string | null
  html_url: string
  name: string | null
  login: string
  followers: number
  following: number
  public_repos: number
}

type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
}

function App() {
  const [user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGetData = async () => {
    const username = user.trim()

    if (!username) {
      setError('Digite um usuário do GitHub.')
      setCurrentUser(null)
      setRepos([])
      return
    }

    setLoading(true)
    setError('')

    try {
      const userData = await fetch(`https://api.github.com/users/${username}`)
      const newUser = await userData.json()

      if (!userData.ok) {
        setError(`Erro ${userData.status}: usuário não encontrado.`)
        setCurrentUser(null)
        setRepos([])
        console.log(newUser)
        return
      }

      const reposData = await fetch(`https://api.github.com/users/${username}/repos`)
      const newRepos = await reposData.json()

      if (!reposData.ok) {
        setError(`Erro ${reposData.status}: não foi possível carregar os repositórios.`)
        setRepos([])
        return
      }

      setCurrentUser(newUser)
      setRepos(newRepos)
      console.log(newUser)
    } catch (err) {
      setError('Não foi possível acessar a API do GitHub.')
      setCurrentUser(null)
      setRepos([])
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className='sm:position relative flex items-start justify-end'>
        <img src={background} className='sm:h-dvh position absolute -left-115 opacity-15' alt='' />

        <div className='w-3/5 mr-24 mt-10 text-white'>
          <div className='flex justify-between items-center gap-3.5'>
            <input
              name='usuario'
              placeholder='@username'
              value={user}
              onChange={event => setUser(event.target.value)}
              className='border border-gray-400 rounded-2xl p-2.5 w-4/5 outline-1 min-w-2xs text-1xl'
            />

            <button
              type='button'
              onClick={handleGetData}
              disabled={loading}
              className='border border-gray-400 rounded-2xl p-2.5 w-32 outline-1 cursor-pointer hover:bg-gray-500 text-1xl'
            >
              {loading ? 'Buscando' : 'Buscar'}
            </button>
          </div>

          {error ? <p className='text-1xl mt-5 text-red-400'>{error}</p> : null}

          {currentUser ? (
            <>
              <div className='flex mt-10 mb-7'>
                <img
                  src={currentUser.avatar_url}
                  className='w-32 h-32 mr-8 border rounded-full'
                  alt='Imagem de perfil'
                />

                <div>
                  <h3 className='text-2xl text-gray-400 m-0'>{currentUser.name ?? currentUser.login}</h3>
                  <p className='text-1xl mt-5 text-gray-400'>{currentUser.bio ?? 'Sem descrição'}</p>
                  <a className='text-blue-300' href={currentUser.html_url} target='_blank' rel='noreferrer'>
                    @{currentUser.login}
                  </a>
                  <div className='flex gap-5 mt-5 text-gray-400'>
                    <span>Repos: {currentUser.public_repos}</span>
                    <span>Seguidores: {currentUser.followers}</span>
                    <span>Seguindo: {currentUser.following}</span>
                  </div>
                </div>
              </div>

              <hr className='hr m-0' />

              <div>
                <h4 className='text-4xl mt-3 mb-3 text-center'>Repositorios</h4>
                {repos.map(repo => (
                  <ListUsers
                    key={repo.id}
                    title={repo.name}
                    description={repo.description ?? 'Sem descrição'}
                    url={repo.html_url}
                  />
                ))}
              </div>
            </>

          ) : null}
        </div>
      </div>
    </>
  )
}

export default App
