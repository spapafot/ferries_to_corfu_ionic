import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import React, { useContext } from 'react';
import { reverseDate } from '../../utils/dateUtils';
import ScheduleContext from '../../store/schedule-context';
import styles from "./DateHeader.module.css"

const DateHeader: React.FC<{
    upOneDay: () => void
    downOneDay: () => void
    dateChangeHandler: () => void
}> = ({ upOneDay, downOneDay, dateChangeHandler }) => {

    const ctx = useContext(ScheduleContext)


    return (
        <div>
            <IonItem className={`${styles.container} floating`}>
                <IonIcon className={styles.arrow} icon={chevronBackOutline} onClick={downOneDay} />
                <label className={styles.label} onClick={dateChangeHandler}>{reverseDate(ctx.date)}</label>
                <IonIcon className={styles.arrow} icon={chevronForwardOutline} onClick={upOneDay} />
            </IonItem>
        </div>
    )
}

export default DateHeader