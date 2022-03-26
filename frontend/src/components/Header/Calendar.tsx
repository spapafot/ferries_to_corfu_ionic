import { IonItem, IonIcon } from '@ionic/react';
import { useContext, useState } from 'react';
import ScheduleContext from '../../store/schedule-context';
import { formatDate } from '../../utils/dateUtils';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import styles from './Calendar.module.css'

const Calendar: React.FC = () => {

    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    const [month, setMonth] = useState(new Date().getMonth())
    const ctx = useContext(ScheduleContext)

    let date = new Date()
    let lastDayOfMonth = new Date(date.getFullYear(), month + 1, 0).getDate()
    let lastDayOfPreviousMonth = new Date(date.getFullYear(), month, 0).getDate()
    date.setDate(1)
    date.setMonth(month)
    let firstDayIndex = date.getDay()
    let lastDayIndex = new Date(date.getFullYear(), month + 1, 0).getDay()
    let nextDays = 7 - lastDayIndex - 1;

    let calendarDays = []

    if (firstDayIndex === 0) {
        firstDayIndex += 7
    }

    for (let x = firstDayIndex - 1; x > 0; x--) {
        // calendarDays.push(lastDayOfPreviousMonth - x + 1)
        calendarDays.push("")
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
        calendarDays.push(i)
    }

    for (let j = 1; j <= nextDays + 1; j++) {
        // calendarDays.push(j)
        calendarDays.push("")

    }

    const changeDateHandler = (item: any) => {

        if (item) {
            const date = new Date()
            const year = date.getFullYear()
            const currentDate = new Date(year, month, item)
            ctx.changeDate(formatDate(currentDate))

        }
    }

    const oneMonthDown = () => {
        setMonth(month - 1)
    }

    const oneMonthUp = () => {
        setMonth(month + 1)
    }

    return (
        <IonItem>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <IonIcon icon={chevronBackOutline} onClick={oneMonthDown} />
                    <h1>{months[month % 12]}</h1>
                    <IonIcon icon={chevronForwardOutline} onClick={oneMonthUp} />
                </div>
                <div className={styles.calendar}>
                    <div>
                        <div className={styles.grid}>
                            {days.map((item) =>
                                <div key={item} className={styles.days}>
                                    <p>{item}</p>
                                </div>
                            )}
                        </div>
                        <div className={styles.grid}>
                            {calendarDays.map((item: any) =>
                                <div key={item + Math.random()} className={styles.days}>
                                    {new Date() > new Date(date.getFullYear(), date.getMonth(), parseInt(item + 1)) ?
                                        <button disabled className={styles.dates}>{item}</button> :
                                        <button onClick={() => changeDateHandler(item)} className={styles.dates}>{item}</button>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </IonItem>
    )
}

export default Calendar