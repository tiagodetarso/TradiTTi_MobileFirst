import styled from 'styled-components'

const media = {
    smallPhone : '@media(min-width: 250px)',
    phone1: '@media(min-width: 320px)',
    phone2: '@media(min-width: 400px)',
    tablet1: '@media(min-width: 550px)',
    tablet2: '@media(min-width: 725px)',
    desktop: '@media(min-width: 900px)'
 }

export const DeliveryInfoWrap = styled.div`
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
        margin: 2px 0 auto;
    }
    
    p {
        margin-left: 5px;
        margin-right: 5px;
        padding: 5px;
        text-align: center;
        font-family: monospace;
        color: darkBlue;

        ${media.smallPhone} {
            font-size: 11px;
        };
        ${media.phone1} {
            font-size: 12px;
        };
        ${media.phone2} {
            font-size: 13px;
        };
        ${media.tablet1} {
            font-size: 14px;
        };
        ${media.tablet2} {
            font-size: 15px;
        };
        ${media.desktop} {
            font-size: 16px;
        }
        
    }
`