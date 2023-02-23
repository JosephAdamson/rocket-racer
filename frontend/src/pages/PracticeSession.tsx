import GameWindow from "../components/GameWindow";


export default function PracticeSession() {
    return (
        <div className="flex justify-center items-center">
            {/* <TimerWindow timeLimit={120}/> */}
            <GameWindow timeLimit={120}/>
        </div>
    )
}