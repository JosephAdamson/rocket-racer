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
                <div className="flex justify-center items-center w-20 md:w-40 h-40
                 md:w-1/12 bg-slateBlue rounded-md">
                    <h1 className="block pt-4 text-right font-timeBomb text-white text-9xl">{counter}</h1>
                </div>
            </div> : <></>
    );
}