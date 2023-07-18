import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'

function Navigation() {
  return (
    <nav className='flex justify-between p-6 mb-10 border-b-2'>
      <Link href='/'>
        <div>Demeter</div>
      </Link>
      <div className='flex items-center'>
        <ConnectKitButton />
      </div>
    </nav>
  )
}

export default Navigation
