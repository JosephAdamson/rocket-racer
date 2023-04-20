import { PropsWithChildren } from "react";


type ResultRowProps = PropsWithChildren<{
    children: JSX.Element;
    icon: string;
    iconText: string;
}>;


export default function ResultRow(props: ResultRowProps) {
    return (
        <div className="flex items-center">
            <img className="w-6 h-6 my-2 bg-white rounded-full p-1" src={props.icon} alt="keyboard" />
            <div className="flex justify-between text-white w-full md:w-2/5">
                <h3 className="mx-2">{props.iconText}</h3>
                <div className="flex justify-start w-20">
                    {props.children}
                </div>
            </div>
        </div>
    )
}