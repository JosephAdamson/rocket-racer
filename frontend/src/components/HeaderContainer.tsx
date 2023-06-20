import Navbar from "./Navbar"
import { PropsWithChildren } from "react";


type headerContainerProps = PropsWithChildren<{
    children: JSX.Element;
}>;


export default function HeaderContainer(props: headerContainerProps) {
   return (
        <div className="min-h-full max-h-fit">
            <div>
                <Navbar/>
            </div>
            <div className="min-h-screen max-h-fit p-4 liftoff">
                {props.children}
            </div>
        </div>
   );
}