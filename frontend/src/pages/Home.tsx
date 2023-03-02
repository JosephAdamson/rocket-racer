import ActivityCard from "../components/ActivityCard"


export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center h-2/3">
            <ActivityCard heading={"practice"} 
                description={"Improve your skill on your own against the clock"}
                buttonTag={"practice yourself"}
                buttonClr={"bg-softgreen"}
                buttonHref={"/practice"}/>
            <ActivityCard heading={"play"}
                description={"Test your skill against other players."}
                buttonTag={"enter typing race"}
                buttonClr={"bg-sparkorange"}
                buttonHref={"/play"}/>
        </div>
    );
}