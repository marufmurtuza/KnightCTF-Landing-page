// import { useTicker } from '../../../hooks';
import { TickerCell } from '../TickerCell';
import { TickerSeparator } from '../TickerSeparator';
// import style from './Ticker.module.scss';
import { intervalToDuration, isBefore } from 'date-fns';
import { useEffect, useState } from "react";


const useTicker = (futureDate) => {
    const [now, setNow] =  useState(new Date());

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

    let { days, hours, minutes, seconds } = intervalToDuration({
        start: now,
        end: futureDate
    });

    return { days, hours, minutes, seconds, isTimeUp };
};

export const Ticker = ({ futureDate }) => {
    const { days, hours, minutes, seconds, isTimeUp } = useTicker(futureDate);
    const tickerContents = isTimeUp ? (
        <div >Time is up!!!</div>
    ) : (
        <>
            <TickerCell value={days} label="Days" />
            <TickerSeparator />
            <TickerCell value={hours} label="Hours" />
            <TickerSeparator />
            <TickerCell value={minutes} label="Minutes" />
            <TickerSeparator />
            <TickerCell value={seconds} label="Seconds" />
        </>
    );

    return (
        <div class="flex p-30 ">
            { tickerContents }      
        </div>              
    );
}