

interface RocketTrackProps {
    // textDisplayArrLength: number
    // position: number
    rocket_img: string
}

export default function RocketTrack(props: RocketTrackProps) {
    

    return (
        <div className="border-b-2 border-dashed">
            <img src={props.rocket_img} alt="rocket img" />
        </div>
    )
}