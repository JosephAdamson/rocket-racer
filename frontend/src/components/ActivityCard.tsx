import { NavLink } from "react-router-dom";


interface activityCardProps {
    heading: string;
    description: string;
    buttonTag: string;
    buttonClr: string;
    buttonHref: string;
}


export default function ActivityCard(props: activityCardProps) {
    return (
        <div className="flex p-4 h-60 md:h-40 w-2/3 bg-white m-6 rounded-md shadow-slateblue shadow-md">
            <div className="flex flex-col text-slateblue space-y-2">
                <div className="block">
                    <h1 className="text-2xl">{props.heading}</h1>
                </div>
                <div className="block">
                    <h3>{props.description}</h3>
                </div>
                <div className="block">
                    <button className={`p-2 ${props.buttonClr} font-bold text-white rounded-md p-4 capitalize`}
                    ><NavLink to={props.buttonHref}>{props.buttonTag}</NavLink></button>
                </div>
            </div>
        </div>
    )
}