import { intervalToDuration, isBefore } from 'date-fns';
import { useEffect, useState } from "react";

export const useTicker = (futureDate) => {
    const [now, setNow] =  useState(new Date());
    let { days, hours, minutes, seconds } = intervalToDuration({
        start: now,
        end: futureDate
    });

    useEffect(() => {        
        const interval = setInterval(() => {
            setNow(new Date());          
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
    }, [futureDate]);

    const isTimeUp = isBefore(futureDate, now);

    if (isTimeUp) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp };
    }


    return { days, hours, minutes, seconds, isTimeUp };
};