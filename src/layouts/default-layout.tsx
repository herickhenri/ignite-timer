import { Link, Outlet, useLocation } from 'react-router-dom'
import LogoIgnite from '../../public/logo-ignite.svg'
import { Clock, Scroll } from '@phosphor-icons/react'

export function DefaultLayout() {
  const { pathname } = useLocation()

  return (
    <div className="mx-auto my-[10vh] h-[80vh] min-h-[48rem] max-w-6xl space-y-16 rounded-lg bg-gray-800 p-10">
      <header className="flex items-center justify-between">
        <img src={LogoIgnite} alt="" />

        <div className="flex items-center gap-2">
          <Link
            to={'/'}
            title="Página principal"
            className={`${pathname === '/' ? 'text-green-500' : ''} h-12 w-12 border-y-[3px] border-transparent p-3 transition-colors hover:border-b-green-500`}
          >
            <Clock size={24} />
          </Link>
          <Link
            to={'/history'}
            className={`${pathname === '/history' ? 'text-green-500' : ''} h-12 w-12 border-y-[3px] border-transparent p-3 transition-colors hover:border-b-green-500`}
          >
            <Scroll size={24} />
          </Link>
        </div>
      </header>

      <Outlet />
    </div>
  )
}
