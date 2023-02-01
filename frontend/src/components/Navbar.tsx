import rocket from '../assets/rocket.png';

export default function Navbar() {
    return (
        <nav className="flex h-20 bg-mainPurple w-full">
            <div className="p-2">
                <img src={rocket} alt="rocket.img" className="h-14" />
            </div>
        </nav>
    );
}