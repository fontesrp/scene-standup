import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import useSWRImmutable from 'swr/immutable'

import fetcher from 'src/services/fetcher'

const DevOrder = () => {
  const { data, error, isLoading, mutate } = useSWRImmutable('/api/shuffle', fetcher)

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const [selected, setSelected] = useState<string[]>([])

  const onSelect = (value: string) =>
    setSelected(prevSelected =>
      prevSelected.includes(value)
        ? prevSelected.filter(prevValue => prevValue !== value)
        : [...prevSelected, value]
    )

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
        <List sx={{ width: '100%' }}>
          {data?.names?.map((name: string) => (
            <ListItem disablePadding key={name}>
              <ListItemButton dense onClick={() => onSelect(name)}>
                <ListItemIcon>
                  <Checkbox
                    checked={selected.includes(name)}
                    disableRipple
                    edge="start"
                    inputProps={{ 'aria-labelledby': `checkbox-list-label-${name}` }}
                    tabIndex={-1}
                  />
                </ListItemIcon>
                <ListItemText id={`checkbox-list-label-${name}`} primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
