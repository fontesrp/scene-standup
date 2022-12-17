import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Image from 'next/image'
import Link from 'next/link'

const Login = () => (
  <Box sx={{ alignSelf: 'center', maxWidth: '600px', width: '90%' }}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <Image alt="scene" height={400} src="/scene.svg" style={{ objectFit: 'cover' }} width={400} />
    </Box>
    <Link href="/api/auth/login">
      <Button fullWidth size="large" variant="contained">
        Login
      </Button>
    </Link>
  </Box>
)

export default Login
