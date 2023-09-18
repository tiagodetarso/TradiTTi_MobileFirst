import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { setAddsChosen, popAddsChosen } from '../slices/addsChosenSlice'


import { C_COLOR1, C_COLOR2, D_COLOR2 } from '../global'

//styles
import { ListSwitchWrap } from './listSwitchStyles'

export default function ListSwitch({ array }) {

    const dispatch = useDispatch()
    const addsChosen = useSelector((state) => state.addsChosen.addsChosen)

    function HandleToggle (value) {
        const currentIndex = addsChosen.indexOf(value)
        const newAddsChosen = [...addsChosen]

        if (currentIndex === -1) {
            if (newAddsChosen.length < 2) {
                newAddsChosen.push(value)
            }
        } else {
            newAddsChosen.splice(currentIndex, 1)
        }
        dispatch(setAddsChosen(newAddsChosen))
    }

    return (
        <ListSwitchWrap>
            <Box sx={{ width: '100%', display: 'flex', flexDirection:'column', alignItems: 'center' }}>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: C_COLOR1, display: 'flex', flexDirection:'column', alignItems: 'center' }}
                subheader={ <ListSubheader 
                                sx={{borderRadius: 2, marginTop:2, fontSize: 17, fontWeight: 'bold', color: D_COLOR2, backgroundColor: C_COLOR2 }}
                            >
                                Adicionais (no máximo 2)
                            </ListSubheader>}
            >
                {
                    array.map((add) => (
                        <ListItem key={`${add.specification}`}>
                            <ListItemText 
                                id={`switch-list-label-${add.specification}`} primary={`${add.specification} - R$ ${add.value.toFixed(2).replace(".",",")}`}
                                primaryTypographyProps={{
                                    color: {D_COLOR2},
                                    fontSize: 14,
                                    
                                    lineHeight: '100%',
                                    justifyContent: 'center'
                                }}
                            />

                                <Switch
                                    edge="end"
                                    onChange={() => HandleToggle(add)}
                                    checked={addsChosen.indexOf(add) !== -1}
                                />
                        </ListItem>
                    ))     
                }
            </List>
            </Box>
      </ListSwitchWrap>
    )

}