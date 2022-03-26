import { useReducer } from 'react';
import ScheduleContext from './schedule-context';
import { formatDate } from '../utils/dateUtils'


const defaultScheduleState = {
    date: formatDate(new Date()),
    route: 'igoymenitsa-kerkyra',

};


const scheduleReducer = (state: any, action: any) => {
    if (action.type === 'CHANGE_DATE') {

        const newDate = action.date
        return {
            date: newDate,
            route: state.route,
        }
    }
    if (action.type === 'CHANGE_ROUTE') {

        const newRoute = action.route

        return {
            date: state.date,
            route: newRoute
        }
    }

    return defaultScheduleState;
};

const ScheduleProvider: React.FC = (props) => {
    const [scheduleState, dispatchScheduleChange] = useReducer(
        scheduleReducer,
        defaultScheduleState
    );

    const changeDateHandler = (date: string) => {
        dispatchScheduleChange({ type: 'CHANGE_DATE', date: date });
    };

    const changeRouteHandler = (route: string) => {
        dispatchScheduleChange({ type: 'CHANGE_ROUTE', route: route });
    };


    const scheduleContext: {
        date: string
        route: string
        changeDate: (date: string) => void
        changeRoute: (route: string) => void
    } = {
        date: scheduleState.date,
        route: scheduleState.route,
        changeDate: changeDateHandler,
        changeRoute: changeRouteHandler
    };

    return (
        <ScheduleContext.Provider value={scheduleContext}>
            {props.children}
        </ScheduleContext.Provider>
    );
};

export default ScheduleProvider;