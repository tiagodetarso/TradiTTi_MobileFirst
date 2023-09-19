// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button';
import { addItem } from '../slices/orderSlice'
import { clearAddsArray } from '../slices/addsSlice'
import { clearChoiceArray } from '../slices/comboChoiceSlice'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

import BButton from '../formItems/button'
import ModalAdds from '../components/modalAdds'
import ModalCombo from '../components/modalCombo'

//styles
import { ProductWrap } from './productStyles'

export default function Product() {

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selectedProduct = useSelector((state) => state.selected.product)
    const addsArray = useSelector((state) => state.adds.addsArray)
    const comboArray = useSelector((state) => state.comboChoice.choiceArray)
    const orderItems = useSelector((state) => state.order.orderItems)
    
    const now = new Date()

    const [image, setImage] = useState('')
    const [quantity, setQuantity] = useState(0)
    
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogMessage, setDialogMessage] = useState("")
    const [dialogTitle, setDialogTitle] = useState("")

    function Plus() {
        setQuantity(Number(quantity+1))
    }

    function Minus() {
        quantity > 0 ? setQuantity(Number(quantity)-1) : quantity
    }

    useEffect(() => {

        function GetImage(productId) {
            fetch (`${apiUrl}/product/image`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({id: productId})
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === "Pesquisa bem sucedida!") {
                    setImage(data.content)
                } 
            })
            .catch((err) => console.log(err))
        }
        
        GetImage(selectedProduct._id)

    },[apiUrl, selectedProduct._id])

    function OpenDialog() {
        setOpenDialog(true)
    }

    function CloseDialog() {
        setOpenDialog(false)
    }

    function AddToOrder() {
        if (quantity == 0) {
            setOpenDialog(true)
            setDialogMessage("Você não preencheu a quantitade. Preencha e tente novamente!")
            setDialogTitle("Está faltando alguma coisa.")
        } else if (selectedProduct.subType === 'esfiha combos' && 
                   (selectedProduct.specification === 'diverso 10' ||
                   selectedProduct.specification === 'diverso 20' ||
                   selectedProduct.specification === 'especial 10' ||
                   selectedProduct.specification === 'especial 20' ||
                   selectedProduct.specification === 'misto') &&
                   comboArray.length === 0) {
            setOpenDialog(true)
            setDialogMessage("Você ainda não escolheu as esfihas do combo. Clique, acima, em 'Escolher as esfihas do combo'")
            setDialogTitle("Está faltando alguma coisa.")
        } else {
            setOpenDialog(true)
            setDialogMessage(
                `Você adicionou ao seu pedido:\n
                ${quantity} x ${selectedProduct.subType} - ${selectedProduct.specification}
                `
            )
            setDialogTitle('Muito bem!')
            dispatch(addItem({
                id: selectedProduct._id,
                subType: selectedProduct.subType,
                specification: selectedProduct.specification,
                unity: selectedProduct.unity,
                value: selectedProduct.value,
                fixPromotionDay: selectedProduct.fixPromotionDay,
                promotionValue: selectedProduct.promotionValue,
                quantity: quantity,
                extra: addsArray,
                combo: comboArray
            }))
        }
    }

    useEffect(() => {
        dispatch(clearAddsArray())
    },[orderItems])

    function ModalToProduct () {
        OpenDialog()
        setDialogTitle("Está faltando alguma coisa.")
        setDialogMessage("Coloque a quantidade antes de escolher os adicionais.")
    }

    function ModalComboToProduct () {
        OpenDialog()
        setDialogTitle("Há alguma coisa errada.")
        setDialogMessage("Para o combo de esfihas você deve, obrigatoriamente, colocar a quantidade de 1.")
    }

    function OrderInstruction () {
        OpenDialog()
        setDialogTitle("Tudo certo.")
        setDialogMessage("Clique no botão 'ADICIONAR AO PEDIDO' para concluir este item.")
    }

    function goToOrder() {
        dispatch(clearChoiceArray())
        navigate("/order")
    }

    function goToMenu() {
        dispatch(clearChoiceArray())
        navigate("/menu")
    }

    return (
        <ProductWrap>
            <div className='productImage'>
                {
                    image ?
                    <img className='image' src={`data:image/jpeg;base64,${image}`} alt='productImage'/> :
                    <h2 className='noImage'>Produto sem imagem cadastrada</h2>
                }
            </div>
            <div className='productDescription'>
                <h2 className='name'>{`${selectedProduct.subType} - ${selectedProduct.specification}`}</h2>
                <h3 className='specification'>{`(${selectedProduct.subSpecification})`}</h3>
                {
                    now.getDay() === selectedProduct.fixPromotionDay ?
                    <h3 className='price'>{`R$ ${selectedProduct.promotionValue.toFixed(2).replace(".",",")} por ${selectedProduct.unity}`}</h3> :
                    <h3 className='price'>{`R$ ${selectedProduct.value.toFixed(2).replace(".",",")} por ${selectedProduct.unity}`}</h3>
                }
            </div>
            <div className='quantityDiv'>
                <h2 className='quantityTitle'>Quantidade:</h2>
                <div className='counter'>
                    <button className='minus' type='button' onClick={() => Minus()}><AiOutlineMinusCircle /></button>
                    <input className='quantity' type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                    <button className ='plus' type='button' onClick={() => Plus()}><AiOutlinePlusCircle /></button>
                </div>
            </div>
            <div className='modal'>
            {
                selectedProduct.subType === 'esfiha' || selectedProduct.subType === 'esfiha massa intg'
                ?
                <>
                <ModalAdds prod={'adicional es'} qtt={quantity}  txt="Deseja acrescentar adicionais?" dialog={ModalToProduct} instruction={OrderInstruction} />
                </>
                :
                    selectedProduct.subType === 'esfiha doce'
                    ?
                    <>
                    <ModalAdds prod={'adicional ed'} qtt={quantity} txt="Deseja acrescentar adicionais?" dialog={ModalToProduct} instruction={OrderInstruction} />
                    </>
                    :
                        selectedProduct.subType === 'pastel doce'
                        ?
                        <>
                        <ModalAdds prod={'adicional pd'} qtt={quantity} txt="Deseja acrescentar adicionais?" dialog={ModalToProduct} instruction={OrderInstruction} />
                        </>
                            :
                            selectedProduct.subType === 'esfiha combos' && selectedProduct.specification !== 'carne 10' && selectedProduct.specification !=='carne 20' && selectedProduct.specification !=='frango10' && selectedProduct.specification !=='frango20'
                            ?
                            <>
                            <ModalCombo combo={selectedProduct.specification} qtt={quantity} txt="Escolher as esfihas do combo" dialog={ModalComboToProduct}  instruction={OrderInstruction} />
                            </>
                            :
                            <></> 
                    
            }
            </div>
            <div className='button'>
                <BButton text="Adicionar ao Pedido" handleOnClick={AddToOrder} />
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
                            dialogTitle === "Está faltando alguma coisa." || dialogTitle === "Há alguma coisa errada." || dialogTitle === "Tudo certo." ? 
                            <Button onClick={CloseDialog}>OK!</Button> :
                            <>
                                <Button onClick={goToMenu}>Continuar Escolhendo</Button>
                                <Button onClick={goToOrder}>Finalizar Escolha</Button>
                            </>
                        }
                    </DialogActions>
                </Dialog>
                <Button onClick={goToMenu}>
                    Voltar ao Menu
                </Button>
            </div>
        </ProductWrap>
    )
}