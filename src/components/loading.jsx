import { LoadingWrap } from './loadingStyles'
import loading from '../../images/loading.svg'

export default function Loading () {

    return (
        <LoadingWrap>
            <img src={loading} alt="Loading" />
        </LoadingWrap>
    )
}