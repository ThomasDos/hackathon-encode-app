import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'

function Navigation() {
  return (
    <nav className='flex justify-between p-6 mb-10 border-b-2'>
      <Link href='/'>
        <div>Demeter</div>
      </Link>
      <div className='flex items-center'>
        <div className='px-4'>
          <Link href='/admin'>Admin</Link>
        </div>
        <div className='px-4'>
          <Link href='/create-new-bridge-token'>Bridge ERC20</Link>
        </div>
        <div className='px-4'>
          <Link href='/bridge'>Bridge</Link>
        </div>
        <div className='flex items-center'>
          <ConnectKitButton />
        </div>
      </div>
    </nav>
  )
}

export default Navigation
