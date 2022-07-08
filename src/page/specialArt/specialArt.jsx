import "./specialArt.css"
import SpecialArtTableComponent from "../component/specialArt/specialArtTableCompoenet";
import SpecialArtTableTotalFooter from "../component/specialArt/specialArtTableTotalFooter";
import SpecialArtTableRateFooter from "../component/specialArt/specialArtTableRateFooter";
import SpecialArtTableHeader from "../component/specialArt/specialArtTableHeader";

import { useState } from 'react'

const SpecialArt = () => {
    const battleTurns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"] //回合數
    const [notToReRender, SetNotToReRender] = useState(true);

    /* 每回合的技量總和State */
    const [turn1, setTurn1] = useState(0);
    const [turn2, setTurn2] = useState(0);
    const [turn3, setTurn3] = useState(0);
    const [turn4, setTurn4] = useState(0);
    const [turn5, setTurn5] = useState(0);
    const [turn6, setTurn6] = useState(0);
    const [turn7, setTurn7] = useState(0);
    const [turn8, setTurn8] = useState(0);
    const [turn9, setTurn9] = useState(0);
    const [turn10, setTurn10] = useState(0);
    const [turn11, setTurn11] = useState(0);
    const [turn12, setTurn12] = useState(0);
    const [turn13, setTurn13] = useState(0);
    const [turn14, setTurn14] = useState(0);

    /* 使用forEach去跑回圈執行不同的setState節省行數 */
    const setTurns = [setTurn1, setTurn2, setTurn3, setTurn4, setTurn5, setTurn6, setTurn7, setTurn8, setTurn9, setTurn10, setTurn11, setTurn12, setTurn13, setTurn14 ];

    /* 傳每回合技量用的陣列 */
    const turns = [turn1, turn2, turn3, turn4, turn5, turn6, turn7, turn8, turn9, turn10, turn11, turn12, turn13, turn14];

    const specialArtRate = { // 必殺技量對應數值
        "0" : 0,
        "0%" : 1,
        "33%" : 1 + 1/3,
        "66%" : 1 + 2/3,
        "100%" : 2,
        "111%" : 2 + 1/9,
        "133%" : 2 + 1/3,
        "144%" : 2 + 1/3 + 1/9,
        "200%" : 3,
        "211%" : 3 + 1/9
    };

    /* 計算用function */
    /**
     * 1.開始計算前先清除上次計算的紀錄
     * 2.接著透過setTurns.forEach設定每回合的技量
     * 3.透過Array.from(document.getElementByClassName(turn))把每回合的技量撈出來丟進thisTurnRate這個陣列裡
     * 4.再透過thisTurnRate.forEach把該回合的每個input加起來
     * 5.set完之後就把這回合的總和(total)丟給previousTurnTotal方便下回合的加總
     * 6.最後再把total清0
     */
    function SpecialArtRateCalculate(){
        SetNotToReRender(true);
        var previousTurnTotal = 0;
        var total = 0;

        setTurns.forEach(function(setTurn, index){
            var thisTurnRate = Array.from(document.getElementsByClassName((index+1).toString()));

            thisTurnRate.forEach(turnRate => total = total + specialArtRate[turnRate.value]);

            setTurn(total + previousTurnTotal);
            previousTurnTotal += total;
            total = 0;
        });
    }

    /* 清除用function */
    function ClearAllTurnRate(){
        SetNotToReRender(false);
        setTurns.forEach(setTurn => setTurn(0));
    }

    return (
        <div id="specialArtCalculateContainer">
            <table id="specialArtCalculateTable">
                <thead>
                    <SpecialArtTableHeader />
                </thead>

                <tbody>
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} />
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} />
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} />
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} />
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} />
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} />
                    <SpecialArtTableRateFooter accumulationRate={turns} />
                    <SpecialArtTableTotalFooter accumulationRate={turns} />
                </tbody>                
            </table>
            
            <div id="buttonGroup">
                <button id="calculate" onClick={SpecialArtRateCalculate}>計算</button>
                <button id="clear" onClick={ClearAllTurnRate}>清除</button>
            </div>
        </div>
    )
}

export default SpecialArt;