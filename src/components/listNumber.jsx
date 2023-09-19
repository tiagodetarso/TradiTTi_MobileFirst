// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { setComboArray } from '../slices/comboSlice'

import { C_COLOR1, C_COLOR2, D_COLOR2 } from '../global'

//styles
import { ListNumberWrap } from './listNumberStyles'

export default function ListNumber ({ array }) {

    const dispatch = useDispatch()
    const [localComboArray, setLocalComboArray] = useState(array.map(item => ({ ...item, quantity: 0 })))

    function Plus(index) {
        const updatedLocalComboArray = [...localComboArray];
        updatedLocalComboArray[index] = {
            ...updatedLocalComboArray[index],
            quantity: (updatedLocalComboArray[index].quantity || 0) + 1,
        };
        setLocalComboArray(updatedLocalComboArray);
        dispatch(setComboArray(updatedLocalComboArray));
    }
      
      function Minus(index) {
        const updatedLocalComboArray = [...localComboArray];
        if (updatedLocalComboArray[index].quantity > 0) {
            updatedLocalComboArray[index] = {
                ...updatedLocalComboArray[index],
                quantity: updatedLocalComboArray[index].quantity - 1,
            };
            setLocalComboArray(updatedLocalComboArray);
            dispatch(setComboArray(updatedLocalComboArray));
        }
    }

    return (
        <ListNumberWrap>
            <Box sx={{ width: '100%', display: 'flex', flexDirection:'column', alignItems: 'center' }}>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: C_COLOR1, display: 'flex', flexDirection:'column', alignItems: 'center' }}
                subheader={ <ListSubheader 
                                sx={{borderRadius: 2, marginTop:2, fontSize: 17, fontWeight: 'bold', color: D_COLOR2, backgroundColor: C_COLOR2 }}
                            >
                                Sabores - Quantidade
                            </ListSubheader>}
            >
                {
                    localComboArray.map((flavor, index) => (
                        <ListItem key={`${flavor.specification}`}>
                            <ListItemText 
                                id={`switch-list-label-${flavor.specification}`}
                                primary={flavor.specification}
                                primaryTypographyProps={{
                                    color: {D_COLOR2},
                                    fontSize: 16,
                                    fontFamily: 'arial',
                                    lineHeight: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            />
                            <div className='plusMinus'>
                                <button className='minus' type='button' onClick={() => Minus(index)}><AiOutlineMinusCircle /></button>
                                <input key={flavor.specification} className='quantity' type='text' value={flavor.quantity || 0} readOnly></input>
                                <button className ='plus' type='button' onClick={() => Plus(index)}><AiOutlinePlusCircle /></button>
                            </div>
                        </ListItem>
                    ))     
                }
            </List>
            </Box>
      </ListNumberWrap>
    )
}