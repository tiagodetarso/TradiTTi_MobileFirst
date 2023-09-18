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
import { popAddsChosen } from '../slices/addsChosenSlice'
import { addAddsArray } from '../slices/addsSlice'

import { C_COLOR2 } from '../global'

//components
import ListSwitch from './listSwitch'
import BButton from '../formItems/button'

//styles
import { ModalWrap } from './modalStyles'


export default function ModalAdds({ prod, qtt, txt, dialog, instruction }) {
    
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
    const clientNumber = import.meta.env.VITE_REACT_APP_CLIENT_NUMBER

    const dispatch = useDispatch()
    const addsChosen = useSelector((state) => state.addsChosen.addsChosen)

    const [openModal, setOpenModal] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMessage, setDialogMessage] = useState("")
    const [addsList, setAddsList] = useState([])
    const [nitem, setNitem] = useState(0)

    function OpenModal() {
        if (Number(qtt) === 0) {
            dialog()
        } else {
            setOpenModal(true)
        }
    }

    function OpenDialog() {
        setOpenDialog(true)
    }

    function CloseModal() {
        setOpenModal(false)
        dispatch(popAddsChosen())
        instruction()
    }

    function CloseDialog() {
        setOpenDialog(false)
    }
    
    function AdditionalList () {
        fetch (`${apiUrl}/product/extralist`, {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
          },
          body: JSON.stringify({clientNumber: clientNumber, subType: prod})
        })
        .then(resp => resp.json())
        .then((data) => {
            if (data.msg === "Pesquisa bem sucedida!") {
              setAddsList(data.content)
            } 
        })
        .catch((err) => console.log(err))
      }

      function Add() {
        var adicional = []
        var valorAdicional = 0

        for (const produto of addsChosen) {
            adicional.push(produto.specification)
            valorAdicional += produto.value
          }
        
        dispatch(addAddsArray({add: adicional, value: valorAdicional}))
        setDialogTitle("Muito bem!")
        setDialogMessage(`Você colocou adicional(is) em ${nitem + 1} de ${qtt}`)
        OpenDialog()
      }
      
      function NewAdditional() {
        CloseDialog()
        dispatch(popAddsChosen())
        setNitem(nitem+1)
      }

      useEffect(() => {
        AdditionalList()
      }, [nitem])

    return (
        <>
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
                <h3>{`Produto ${nitem+1} de ${qtt} selecionados`}</h3>
                <ListSwitch array={addsList} />
                <div className='button'>
                    <BButton text="Adicionar ao Pedido" handleOnClick={Add} />
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
                                    nitem+1 < Number(qtt) ?
                                    <>
                                        <Button onClick={NewAdditional}>Colocar ADD na próxima esfiha</Button>
                                        <Button onClick={CloseModal}>Voltar à tela do produto</Button>
                                    </> :
                                    <Button onClick={CloseModal}>Voltar à tela do produto</Button>
                                }
                            </DialogActions>
                        </Dialog>
                        <Button onClick={CloseModal} style={{ width: '100%' }}>
                            Voltar ao Produto
                        </Button>
                </div>
            </ReactModal>
        </ModalWrap>
        </>
    )
}