import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'

const Profile = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return user ? (
    <div>
      {!!user.picture && (
        <Image alt={user.name || ''} height={120} src={user.picture} width={120} />
      )}
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  ) : null
}

export default Profile
