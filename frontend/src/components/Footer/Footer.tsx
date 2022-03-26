import { IonFooter, IonText } from "@ionic/react";
import styles from "./Footer.module.css"

const Footer: React.FC = () => {
    return (
        <IonFooter>
            <IonText> © {new Date().getFullYear()} Copyright - Ferries To Corfu</IonText>
        </IonFooter>
    )
}

export default Footer