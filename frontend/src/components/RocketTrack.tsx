import { useState, useEffect, useRef } from 'react';


interface RocketTrackProps {
    textDisplayArrLength: number;
    position: number;
    rocket_img: string;
    username: string;
}


export default function RocketTrack(props: RocketTrackProps) {
    const [progress, setProgress] = useState<string>("");
    const track = useRef<HTMLDivElement>(null);
    const rocket = useRef<HTMLImageElement>(null);

    const getOffset = (percentage: number): number => {
        if (track.current) {
            const trackWidth: number = track.current.getBoundingClientRect().width;
            return (trackWidth / 100) * percentage;
        } else {
            return 0;
        }
    }

    /*
    @return {number}    width of the container element for the rocket track (a div) 
    */
    const getRocketWidth = () => {
        return rocket.current ? rocket.current.getBoundingClientRect().width : 0;
    }


    /*
    Re-compute position of rocket track on rerender according to cursor state
    of parent.
    */
    useEffect(() => {
        // calculate progress
        let curr = props.position;
        if (curr > 0) {
            // negate elements containing whitespace
            curr = curr / 2;
            const halfRocketWidth = getRocketWidth() / 2;
            const wordCount: number = Math.ceil(props.textDisplayArrLength);
            const trackPercentage = ((props.position / 2) / wordCount) * 100;
            const offset = halfRocketWidth / 2 + (halfRocketWidth / 100) * trackPercentage;
            const increment: number = (getOffset(trackPercentage) - offset);
            setProgress(`translateX(${increment}px)`)
        }
    }, [props]);
    

    return (
        <div ref={track} className="border-b-2 my-1 border-dashed border-dashYellow">
            <div ref={rocket} style={{transform: progress}} className="flex flex-col w-fit">
                <h3 className="font-bold">{props.username}</h3>
                <img className="h-20" src={props.rocket_img} alt="rocket img" />
            </div>
        </div>
    )
}