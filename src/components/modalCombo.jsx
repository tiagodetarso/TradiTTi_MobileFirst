// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactModal from 'react-modal'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { setChoiceArray } from '../slices/comboChoiceSlice'
import { clearComboArray } from '../slices/comboSlice'

import { C_COLOR2 } from '../global'

//components
import ListNumber from './listNumber'
import BButton from '../formItems/button'

//styles
import { ModalWrap } from './modalStyles'

export default function ModalCombo ({ combo, qtt, txt, dialog, instruction }) {

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
    const clientNumber = import.meta.env.VITE_REACT_APP_CLIENT_NUMBER

    const dispatch = useDispatch()
    const comboArray = useSelector((state) => state.combo.comboArray)

    const [openModal, setOpenModal] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMessage, setDialogMessage] = useState("")
    const [comboList, setComboList] = useState([])

    function OpenModal() {
        Number(qtt) !== 1 ?
        dialog() :
        setOpenModal(true)
    }

    function CloseModal() {
        setOpenModal(false)
        dispatch(clearComboArray())
        instruction()
    }
    
    function OpenDialog() {
      setOpenDialog(true)
    }

    function CloseDialog() {
      setOpenDialog(false)
    }

    function ComboMistoList () {
        fetch (`${apiUrl}/product/combomistolist`, {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
          },
          body: JSON.stringify({clientNumber: clientNumber, subType1: 'esfiha', subType2: 'esfiha doce'})
        })
        .then(resp => resp.json())
        .then((data) => {
            if (data.msg === "Pesquisa bem sucedida!") {
              const initializedComboArray = data.content.map(item => ({ ...item, quantity: 0 }));
              setComboList(initializedComboArray);
            } 
        })
        .catch((err) => console.log(err))
      }

    useEffect(() => {
        combo === 'misto'
        ?
        ComboMistoList()
        :
            combo === 'diverso 10' || combo === 'diverso 20'
            ?
            setComboList([
              {_id:1, specification:'calabresa', quantity:0},
              {_id:2, specification:'calabresa com cebola', quantity:0},
              {_id:3, specification:'frango com bacon', quantity:0},
              {_id:4, specification:'frango com catupiry', quantity:0},
              {_id:5, specification:'frango com cheddar', quantity:0},
              {_id:6, specification:'milho com bacon', quantity:0},
              {_id:7, specification:'palmito', quantity:0},
              {_id:8, specification:'palmito com azeitona', quantity:0},
              {_id:9, specification:'pizza', quantity:0},
              {_id:10, specification:'quatro queijos', quantity:0},
              {_id:11, specification:'queijo com bacon', quantity:0}
            ])
            :
            setComboList([
              {_id:1, specification:'atum', quantity:0 },
              {_id:2, specification:'carne com cream cheese', quantity:0 },
              {_id:3, specification:'portuguesa', quantity:0 },
              {_id:4, specification:'tomate seco', quantity:0 }
            ])
    },[])
    
    function ComboChoice () {
      let comboChoiceArray=[]
      let productQuantity=0
      let quantityLimit=0

      combo === 'misto' ? comboChoiceArray.push({specification: 'carne', quantity: 3}) : comboChoiceArray
      combo === 'misto' || combo === 'diverso 10' || combo === 'especial 10' ? quantityLimit = 10 : quantityLimit = 20

      for (let item of comboArray) {
        if (item.quantity !== 0) {
          comboChoiceArray.push({specification: item.specification, quantity: item.quantity})
        }
      }

      for (let item of comboChoiceArray) {
        if (item.quantity !==0) {
          productQuantity += item.quantity
        }
      }

      if (productQuantity > quantityLimit) {
        setDialogTitle("Atenção!")
        setDialogMessage(`Você selecionou ${productQuantity - quantityLimit} esfiha(s) a mais. Diminua a quantidade!`)
        OpenDialog()
      } else if (productQuantity < quantityLimit) {
        setDialogTitle("Atenção!")
        setDialogMessage(`Ainda falta selecionar ${quantityLimit - productQuantity} esfiha(s). Complete a seleção!`)
        OpenDialog()
      } else {
        setDialogTitle("Muito bem!")
        setDialogMessage("Você escolheu corretamente as esfihas do seu combo!")
        OpenDialog()
        dispatch(setChoiceArray(comboChoiceArray))
      }

    }

    return(
        <ModalWrap>
            <Button onClick={OpenModal}>{txt}</Button>
            <ReactModal
                isOpen={openModal}
                onRequestClose={CloseModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    },
                    content: {
                    position: 'absolute',
                    top: '40px',
                    left: '10px',
                    right: '10px',
                    bottom: '40px',
                    background: C_COLOR2,
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '10px',
                    padding: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                    }
                }}
            >
              {
                combo === 'misto' ? <h3>Este combo é composto por 3 esfihas de carne, mais 7 a serem escolhidas</h3> :
                combo === 'diverso 10' || combo === 'especial 10' ? <h3>As quantidades deve somar 10 esfihas</h3>:
                <h3>As quantidades deve somar 20 esfihas</h3>
              }
                <ListNumber array={comboList} />
                <div className='button'>
                  <BButton text='Confirmar Combo' handleOnClick={ComboChoice}/>
                  <Dialog
                    open={openDialog}
                    onClose={CloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {dialogMessage}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      {
                        dialogTitle === "Atenção!" ?
                        <>
                        <Button onClick={CloseDialog}>Ok</Button>
                        </> :
                        <>
                        <Button onClick={CloseModal}>Voltar à tela do produto</Button>
                        </> 
                      }
                    </DialogActions>
                  </Dialog>
                  <Button onClick={CloseModal} style={{ width: '100%' }}>
                            Voltar ao Produto
                  </Button>
                </div>
            </ReactModal>
        </ModalWrap>
    )
}