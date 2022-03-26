import { IonIcon, IonItem, IonLabel } from '@ionic/react'
import { swapHorizontalOutline } from 'ionicons/icons'
import styles from "./RouteDirection.module.css"

const RouteDirection: React.FC<{
    route: string
    routeChangeHandler: () => void }> = ({route, routeChangeHandler}) => {

    const routesDisplay = (route:string) => {

        let startPort:string
        let endPort:string

        if (route === 'kerkyra-igoymenitsa') {
            startPort = "CFU"
            endPort = "IGO"
        }
        else {
            startPort = "IGO"
            endPort = "CFU"
        }

        return (
            <IonItem className={styles.container}>
                <label className={styles.route}>{startPort}</label>
                <IonIcon className={styles.switch} icon={swapHorizontalOutline} />
                <label className={styles.route}>{endPort}</label>
            </IonItem>
        )
    }

    return (
        <div onClick={routeChangeHandler}>
            {routesDisplay(route)}
        </div>

    )
}

export default RouteDirection