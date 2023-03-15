import planets from "../assets/planets.png";


export default function WaitingModal() {
    return (
        <div className="flex my-10 flex-col items-center text-bold font-bold animate-pulse">
            <h1 className="text-xl md:text-3xl text-white text-shadow">Waiting for another player...</h1>
            <img className="md:h-1/4 md:w-1/4" src={planets} alt="waiting img" />
        </div>
    )
}