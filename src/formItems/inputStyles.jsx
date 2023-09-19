import styled from 'styled-components'
import { D_COLOR2 } from '../global'

const media = {
   smallPhone : '@media(min-width: 250px)',
   phone1: '@media(min-width: 320px)',
   phone2: '@media(min-width: 400px)',
   tablet1: '@media(min-width: 550px)',
   tablet2: '@media(min-width: 725px)',
   desktop: '@media(min-width: 900px)'
}

export const InputWrap = styled.div`
    font-weight: bold;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${D_COLOR2};

    label {
        font-family: arial;
        color: ${D_COLOR2};
        align-self: center;
        padding-top:10px;
        ${media.smallPhone} {
            font-size: 17px;
        };
        ${media.phone1} {
            font-size: 18px;
        };
        ${media.phone2} {
            font-size: 19px;
        };
        ${media.tablet1} {
            font-size: 20px;
        };
        ${media.tablet2} {
            font-size: 21px;
        };
        ${media.desktop} {
            font-size: 21px;
        }
    }

    input {
        background-color: #ffffff;
        font-family: arial;
        padding: 5px;
        margin:0;
        border: 1px solid #bdd358;
        border-radius: 10px;
        ${media.smallPhone} {
            width: 240px;
            font-size: 13px;
        };
        ${media.phone1} {
            width: 280px;
            font-size: 13px;
        };
        ${media.phone2} {
            width: 350px;
            font-size: 15px;
        };
        ${media.tablet1} {
            width: 500px;
            font-size: 15px;
        };
        ${media.tablet2} {
            width: 500px;
            font-size: 18px;
        };
        ${media.desktop} {
            width: 500px;
            font-size: 18px;
        }
    }
    
`