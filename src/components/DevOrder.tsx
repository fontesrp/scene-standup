import { useUser } from '@auth0/nextjs-auth0/client'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import useSWRImmutable from 'swr/immutable'

import fetcher from 'src/services/fetcher'

import DevList from './DevList'
import Loading from './Loading'
import Login from './Login'
import Uninvited from './Uninvited'

const DevOrder = () => {
  const {
    data,
    error: requestError,
    isLoading: isRequestLoading,
    mutate
  } = useSWRImmutable('/api/shuffle', fetcher)

  const { error: userError, isLoading: isUserLoading, user } = useUser()

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const errorMessage = requestError?.message || ''

  const showLogin =
    !!userError || isUserLoading || !user?.email || errorMessage.includes('not_authenticated')

  const isUninvited = errorMessage.includes('Invalid session')

  return (
    <>
      {matches && <Box sx={{ flex: 1 }} />}
      {(showLogin && <Login />) || (isUninvited && <Uninvited />) || (
        <>
          <Paper
            variant="outlined"
            sx={{
              alignSelf: 'center',
              margin: matches ? '0 0 25px' : '25px 0',
              maxWidth: '600px',
              width: '90%'
            }}
          >
            {isRequestLoading || !data?.names?.length ? (
              <Loading />
            ) : (
              <DevList names={data.names} />
            )}
          </Paper>
          <Box sx={{ alignSelf: 'center', maxWidth: '600px', width: '90%' }}>
            <Button fullWidth onClick={mutate} size="large" variant="contained">
              Shuffle
            </Button>
          </Box>
        </>
      )}
      {matches && <Box sx={{ flex: 2 }} />}
    </>
  )
}

export default DevOrder
