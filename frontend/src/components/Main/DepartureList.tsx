import { IonList } from "@ionic/react";
import axios from 'axios'
import { useCallback, useContext, useState, useRef, useEffect } from "react";
import ScheduleContext from "../../store/schedule-context";
import Departure from "./Departure";
import Loader from "./Loader";
import { convertUnixTimestamp } from "../../utils/dateUtils";
import styles from "./DepartureList.module.css"

const DepartureList: React.FC = () => {

    const ctx = useContext(ScheduleContext)
    const [schedule, setSchedule] = useState<any[]>([])
    const [wind, setWind] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const mountedRef = useRef(true)
    const localURL = "http://127.0.0.1:8000/api"
    const AWSURL = "https://f43ewqlxh9.execute-api.eu-central-1.amazonaws.com/dev/api"

    const getSchedule = async () => {

        try {
            const response = await axios.get(`${localURL}/${ctx.route}/${ctx.date}/`)
            const data = response.data['details']
            setSchedule(data)
        } catch (err: any) {
            if (err.response.status === 404) {
                setSchedule([])
            }
        }
    }

    const getWind = useCallback(async () => {

        try {
            const response = await axios.get(`${localURL}/wind/`)
            const data = response.data['hourly']
            if (!mountedRef.current) return null
            setWind(data)
            setIsLoading(false)
        } catch (err: any) {
            console.log(err.response)
        }
    }, [mountedRef])


    useEffect(() => {
        getSchedule()
    }, [ctx])



    useEffect(() => {
        getWind()
        return () => {
            mountedRef.current = false;
        };
    }, [getWind])



    return (
        <>
            {isLoading ? <Loader /> :
                <IonList>
                    {schedule.map((item: any) =>
                        <Departure
                            key={item.departure_time}
                            departure_time={item.departure_time}
                            arrival_time={item.arrival_time}
                            ship={item.ship}
                            company={item.company}
                            startTime={new Date(`${ctx.date}T${item.departure_time}:00`)}
                            currentTime={new Date()}
                            currentWind={wind && wind.filter((i: any) => convertUnixTimestamp(i['dt']) > new Date(`${ctx.date}T${item.departure_time}:00`))[0]}
                        />)}
                </IonList>
            }
        </>
    )
}

export default DepartureList