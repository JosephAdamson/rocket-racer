import TimerWindow from "../components/TimerWindow";


export default function PracticeSession() {
    return (
        <div className="flex justify-center items-center">
            <TimerWindow timeLimit={120}/>
        </div>
    )
}