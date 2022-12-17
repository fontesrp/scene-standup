import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Loading = () => (
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
)

export default Loading
