// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaFacebook, FaInstagram, FaMap } from 'react-icons/fa'

//styles
import { FooterWrap } from './footerStyles'

export default function Footer() {
    return (
        <FooterWrap>
            <ul className="social_list">
                <li>
                    <a href="https://www.facebook.com/Bostonesfihariaastorga/">
                        <FaFacebook/>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/bostonesfihariaastorga/">
                        <FaInstagram/>
                    </a>
                </li>
                <li>
                    <a href='https://www.google.com/maps/d/u/0/edit?mid=1in_my5LjDJoWUq8d4wUub76A5UN5xoE&hl=pt-PT&ll=-23.225880450611243%2C-51.66405368570667&z=17'>
                        <FaMap/>
                    </a>
                </li>
            </ul>
            <p className="copy_right">
                Desenvolvido por:
                <a href="https://www.linkedin.com/in/tiago-de-tarso-raggiotto-gonçalves-6375223b/">
                    <span>TIAGO DE TARSO RAGGIOTTO GONÇALVES</span>
                </a>
            </p>
        </FooterWrap>
        
    )
}