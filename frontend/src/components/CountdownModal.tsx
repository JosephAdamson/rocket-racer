import { useState, useEffect } from 'react';


export default function CountdownModal() {
    const [counter, setCounter] = useState<number>(3);
    const [showModal, setShowModal] = useState<boolean>(true);


    useEffect(() => {
        if (counter <= 0) {
            setShowModal(false);
            return;
        }
        const timerID = setInterval(() => {
            setCounter(counter => counter - 1);
        }, 1000);

        return () => {
            clearInterval(timerID);
        }
    },[counter]);

    
    return (
        showModal ?
            <div className="absolute top-[100px] md:top-[120px] flex justify-center items-center w-screen h-1/2">
                <div className=" flex border-8 border-slateBlue justify-center items-center w-1/5
                 md:w-1/12 bg-black font-timeBomb text-highlightGreen rounded-2xl">
                    <h1 className="text-[8rem]">{counter}</h1>
                </div>
            </div> : <></>
    )
}