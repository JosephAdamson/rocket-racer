import Navbar from "./Navbar"
import { PropsWithChildren } from "react";


type headerContainerProps = PropsWithChildren<{
    children: JSX.Element;
}>;


export default function HeaderContainer(props: headerContainerProps) {
   return (
        <div className="h-screen">
            <div>
                <Navbar/>
            </div>
            <div className=" h-full p-4 liftoff">
                {props.children}
            </div>
        </div>
   );
}