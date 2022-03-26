import React from 'react';

const ScheduleContext = React.createContext<{
  date: string
  route: string
  changeDate: (date: string) => void
  changeRoute: (route: string) => void
}>({
  date: '',
  route: '',
  changeDate: (date: string) => { },
  changeRoute: (route: string) => { },

});

export default ScheduleContext;