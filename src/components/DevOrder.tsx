import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import useSWRImmutable from 'swr/immutable'

import fetcher from 'src/services/fetcher'

import DevList from './DevList'

const DevOrder = () => {
  const { data, error, isLoading, mutate } = useSWRImmutable('/api/shuffle', fetcher)

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <>
      {matches && <Box sx={{ flex: 1 }} />}
      <Paper
        variant="outlined"
        sx={{
          alignSelf: 'center',
          margin: matches ? '0 0 25px' : '25px 0',
          maxWidth: '600px',
          width: '90%'
        }}
      >
        {isLoading || !data?.names?.length ? (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              height: '266px',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DevList names={data?.names || []} />
        )}
      </Paper>
      <Box sx={{ alignSelf: 'center', maxWidth: '600px', width: '90%' }}>
        <Button fullWidth onClick={mutate} size="large" variant="contained">
          Shuffle
        </Button>
      </Box>
      {matches && <Box sx={{ flex: 2 }} />}
    </>
  )
}

export default DevOrder
