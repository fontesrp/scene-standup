import Box from '@mui/material/Box'
import Image from 'next/image'

const Uninvited = () => (
  <Box
    sx={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
      width: '100%'
    }}
  >
    <Image alt="uninvited" height={325} src="/uninvited.png" width={400} />
  </Box>
)

export default Uninvited
