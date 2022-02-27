import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import { UnderwaterCities } from "./bgs/UnderwaterCities";
import { Vinhos } from "./bgs/Vinhos";
import { Column } from "./Elements";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Index />} />
                {BGS.map(bg => <Route key={bg.name} path={bg.relativePath} element={bg.element} />)}
            </Routes>
        </div>
    );
}

export default App;

function Index() {
    return <div className="index">
        <Column>
            <h2>Games</h2>
            {BGS.map(bg => <IndexItem
                key={bg.name}
                name={bg.name}
                relativePath={bg.relativePath}
            />)}
        </Column>
    </div>
}

interface IndexItemProps {
    name: string;
    relativePath: string;
}

function IndexItem({name, relativePath}: IndexItemProps) {
    return <div className="index-item">
        <Link to={relativePath}>{name}</Link>
    </div>
}

const BGS: Bg[] = [
    makeBg("Vinhos", "/vinhos", <Vinhos />),
    makeBg("Underwater Cities", "/underwatercities", <UnderwaterCities />)
]

interface Bg {
    name: string;
    relativePath: string;
    element: JSX.Element;
}

function makeBg(name: string, relativePath: string, element: JSX.Element): Bg {
    return {
        name,
        relativePath,
        element,
    }
}
