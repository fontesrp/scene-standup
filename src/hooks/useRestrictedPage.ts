import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'

const useRestrictedPage = () => {
  const router = useRouter()
  const { error, isLoading, user } = useUser()

  if (!isLoading && (error || !user?.email)) {
    router.replace('/api/auth/login')
  }
}

export default useRestrictedPage
