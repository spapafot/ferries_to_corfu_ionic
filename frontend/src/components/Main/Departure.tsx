import { IonItem, IonIcon, IonImg } from "@ionic/react"
import { arrowForwardOutline } from 'ionicons/icons'
import { ships } from "../../utils/shipUtils"
import closed from '../../images/closed.svg'
import open from '../../images/open.svg'
import ks from '../../images/KS.png'
import kl from '../../images/KL.png'
import ShipSpeed from "./ShipSpeed"
import styles from "./Departure.module.css"
import { PaperAirplaneIcon } from "@heroicons/react/solid"

const Departure: React.FC<{
    departure_time: string
    arrival_time: string
    ship: string
    company: string
    currentTime: Date
    startTime: Date
    currentWind: object
}> = ({ departure_time, arrival_time, ship, company, currentTime, startTime, currentWind }) => {

    const companyLogo = company === "KERKYRA LINES" ? kl : ks
    // <IonImg slot="start" className={styles.logo} src={companyLogo} />


    return (
        <IonItem className={styles.container}>
            <div className={styles.grid}>
                <label className={styles.departure}>{departure_time}</label>
                <IonIcon className={styles.icon} icon={arrowForwardOutline} />
                <label className={styles.arrival} >{arrival_time}</label>
                <label className={styles.ship} >{ship}</label>
                <label className={styles.type}>
                    {ships.filter((item: any) => item.name === ship).map(item => item.type === 1 ?
                        <IonImg key={departure_time} src={open} alt="ship type" /> :
                        <IonImg key={departure_time} src={closed} alt="ship type" />)}</label>
               
                <div className={styles.rating}>
                    <label>SPEED:</label>
                    <ShipSpeed shipName={ship} />
                </div>
                <label className={styles.company}>{company}</label>
                <div className={styles.weather}>
                    <label>SE</label>
                    <PaperAirplaneIcon className={styles.weatherIcon} />
                    <label>8°B</label>
                </div>

            </div>
        </IonItem>
    )
}

export default Departure