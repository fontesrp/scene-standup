import React, { useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

type DevListProps = {
  names: string[]
}

const DevList: React.FC<DevListProps> = ({ names }) => {
  const [selected, setSelected] = useState<string[]>([])

  const onSelect = (value: string) =>
    setSelected(prevSelected =>
      prevSelected.includes(value)
        ? prevSelected.filter(prevValue => prevValue !== value)
        : [...prevSelected, value]
    )

  return (
    <List sx={{ width: '100%' }}>
      {names.map((name: string) => (
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
  )
}

export default DevList
