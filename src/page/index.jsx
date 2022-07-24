import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './index.css';
import Home from './home/home'
import MaxDamage from "./maxDamage/maxDamage";
import SpecialArt from "./specialArt/specialArt";
import SkillDamage from "./skillDamage/skillDamage";
import Error from "./error";

const Index = () => {
    return (
        <Router>
            <nav id="headerNavBar">
                <Link to="/" className="navItem">首頁</Link>
                <Link to="/maxDamage" className="navItem">最大傷害</Link>
                <Link to="/specialArt" className="navItem">必殺計量</Link>
                <Link to="/skillDamage" className="navItem">技能傷害</Link>
            </nav>

            <div id='background'>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/maxDamage" element={<MaxDamage />} id="maxDamagePage"></Route>
                    <Route path="/specialArt" element={<SpecialArt />}></Route>
                    <Route path="/skillDamage" element={<SkillDamage />}></Route>
                    <Route path="*" element={<Error />}></Route>
                </Routes>
            </div>
        </Router>
    )
}

export default Index;