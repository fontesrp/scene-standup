import { useUser } from '@auth0/nextjs-auth0/client'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from 'next/link'

const Profile = () => {
  const theme = useTheme()
  const { error, isLoading, user } = useUser()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const { email, name, picture } = user || {}

  return email && !isLoading && !error ? (
    <Card
      sx={{
        alignSelf: matches ? 'flex-end' : null,
        borderColor: matches ? 'transparent' : null,
        borderRadius: matches ? null : '0',
        maxWidth: matches ? '414px' : null
      }}
      variant="outlined"
    >
      <CardContent sx={{ alignItems: 'center', display: 'flex' }}>
        {!!picture && <Avatar alt={name || 'avatar'} src={picture} />}
        <Box sx={{ flex: 1, margin: '0 16px' }}>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="subtitle2">{email}</Typography>
        </Box>
        <Link href="/api/auth/logout">
          <Typography sx={{ color: 'error.main', padding: '18px 8px' }} variant="button">
            Logout
          </Typography>
        </Link>
      </CardContent>
    </Card>
  ) : null
}

export default Profile
