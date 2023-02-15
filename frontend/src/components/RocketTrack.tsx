import { useState, useEffect, useRef } from 'react';


interface RocketTrackProps {
    textDisplayArrLength: number
    position: number
    rocket_img: string
}


export default function RocketTrack(props: RocketTrackProps) {
    const [progress, setProgress] = useState<string>("");
    const track = useRef<HTMLDivElement>(null);
    const rocket = useRef<HTMLImageElement>(null);

    const getOffset = (percentage: number): number => {
        if (track.current) {
            const trackWidth: number = track.current.getBoundingClientRect().width;
            console.log(`%ctrackWidth: ${trackWidth}`, 'color: yellow');
            return (trackWidth / 100) * percentage;
        } else {
            return 0;
        }
    }

    
    const getRocketWidth = () => {
        return rocket.current ? rocket.current.getBoundingClientRect().width : 0;
    }


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
        <div ref={track} className={`border-b-2 border-dashed`}>
            <img ref={rocket} className="h-20" style={{transform: progress}} src={props.rocket_img} alt="rocket img" />
        </div>
    )
}