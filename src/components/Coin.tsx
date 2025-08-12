import coin from '../assets/logo/logo.png'

export const Coin = ({ height }) => {
    return (<img src={coin} alt="pp" className={`h-${height} mr-1 my-auto`} />)
}
