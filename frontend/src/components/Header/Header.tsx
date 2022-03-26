import { IonHeader } from "@ionic/react";
import { useContext, useState } from "react";
import RouteDirection from "./RouteDirection";
import ScheduleContext from "../../store/schedule-context";
import { changeDay } from "../../utils/dateUtils";
import DateHeader from "./DateHeader";
import Calendar from "./Calendar";
import styles from "./Header.module.css"

const Header: React.FC = () => {

    const ctx = useContext(ScheduleContext)
    const [isChoosingDate, setIsChoosingDate] = useState(false)


    const routeChangeHandler = () => {

        if (ctx.route === 'kerkyra-igoymenitsa') {
            ctx.changeRoute('igoymenitsa-kerkyra')
        }
        else {
            ctx.changeRoute('kerkyra-igoymenitsa')
        }
    }

    const dateChangeHandler = () => {
        setIsChoosingDate(prevState => !prevState)
    }

    const upOneDay = () => {

        const newDate: string = changeDay(ctx.date, '+')
        ctx.changeDate(newDate)

    }

    const downOneDay = () => {
        const newDate: string = changeDay(ctx.date, '-')
        const [year, month, day] = newDate.split("-")

        if (new Date(parseInt(year), parseInt(month) - 1, parseInt(day)) < new Date()) {
            return
        } else {
            ctx.changeDate(newDate)
        }
    }


    return (
        <>
            <IonHeader className={styles.container}>
                <RouteDirection route={ctx.route} routeChangeHandler={routeChangeHandler} />
                <DateHeader upOneDay={upOneDay} downOneDay={downOneDay} dateChangeHandler={dateChangeHandler} />
            </IonHeader>
            {isChoosingDate && <Calendar />}
        </>
    )
}

export default Header