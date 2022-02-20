import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import { Vinhos } from "./bgs/Vinhos";

function App() {
    return (
        <div className="app">
            <h1>Welcome to React Router!</h1>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/vinhos" element={<Vinhos />} />
            </Routes>
        </div>
    );
}

export default App;

function Index() {
    return <div>
        {BG_NAMES.map(name => <IndexItem key={name} name={name} />)}
    </div>
}

interface IndexItemProps {
    name: string;
}

function IndexItem({name}: IndexItemProps) {
    return <Link to={bgNameToSlug(name)}>{name}</Link>
}

const BG_NAMES: string[] = [
    "Vinhos",
]

function bgNameToSlug(name: string): string {
    return name.toLowerCase().replace(/\s/g, "");
}
