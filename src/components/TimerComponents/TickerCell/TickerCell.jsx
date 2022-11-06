// import style from './TickerCell.module.scss';

export const TickerCell = ({ label, value }) => {
    const formattedValue = value < 10 ? `0${value}`: value.toString();

    return (
        <div class="flex-1 items-center flex-col ">
            <span class="text-5xl text-green-300" >{ formattedValue }</span>
            <span class="text-white" >{ label }</span>
        </div>
    );
}