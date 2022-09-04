import "./specialArt.css"
import SpecialArtTableComponent from "../component/specialArt/specialArtTableCompoenet";
import SpecialArtTableTotalFooter from "../component/specialArt/specialArtTableTotalFooter";
import SpecialArtTableRateFooter from "../component/specialArt/specialArtTableRateFooter";
import SpecialArtTableHeader from "../component/specialArt/specialArtTableHeader";
import AdvancedSetting from "../component/specialArt/advancedSetting";
import MemoriaSetting from "../component/specialArt/memoriaSetting";

import { useState } from 'react'

const SpecialArt = () => {
    const battleTurns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"] //回合數

    /* 決定表格內容要不要重新渲染的state */
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
    const setTurns = [setTurn1, setTurn2, setTurn3, setTurn4, setTurn5, setTurn6, setTurn7, setTurn8, setTurn9, setTurn10, setTurn11, setTurn12, setTurn13, setTurn14];

    /* 傳每回合技量用的陣列 */
    const turns = [turn1, turn2, turn3, turn4, turn5, turn6, turn7, turn8, turn9, turn10, turn11, turn12, turn13, turn14];

    const specialArtRate = { // 必殺技量對應數值
        "0": 0,
        "0%": 1,
        "33%": 1 + 1 / 3,
        "44%": 1 + 4 / 9,
        "66%": 1 + 2 / 3,
        "77%": 1 + 7 / 9,
        "100%": 2,
        "111%": 2 + 1 / 9,
        "133%": 2 + 1 / 3,
        "144%": 2 + 1 / 3 + 1 / 9,
        "155%": 2 + 1 / 9 + 4 / 9,
        "166%": 2 + 2 / 3,
        "177%": 2 + 2 / 3 + 1 / 9,
        "200%": 3,
        "211%": 3 + 1 / 9,
        "222%": 3 + 2 / 9
    };

    const MemoriaSpecialArtRate = {
        "11%": 1 / 9,
        "22%": 2 / 9,
        "33%": 3 / 9,
        "44%": 4 / 9
    }

    /* 計算用function */
    /**
     * 1.開始計算前先清除上次計算的紀錄
     * 2.接著透過setTurns.forEach設定每回合的技量
     * 3.透過Array.from(document.getElementByClassName(turn))把每回合的技量撈出來丟進thisTurnRate這個陣列裡
     * 4.再透過thisTurnRate.forEach把該回合的每個input加起來
     * 5.set完之後就把這回合的總和(total)丟給previousTurnTotal方便下回合的加總
     * 6.最後再把total清0
     */
    function SpecialArtRateCalculate() {
        SetNotToReRender(true); //讓表格內容不要被重新渲染
        var previousTurnTotal = 0;
        var total = 0;

        setTurns.forEach(function (setTurn, index) {
            var thisTurnRate = Array.from(document.getElementsByClassName((index + 1).toString()));

            var isMemoriaActivated = document.getElementById("MemoriaSettingCheck").checked;

            if (index === 5 && isMemoriaActivated) {
                var memoriaRate = MemoriaSpecialArtRate[document.getElementById("MemoriaSpecialArtRate").value];

                thisTurnRate.forEach(function (turnRate) {
                    if (turnRate.value !== "0") {
                        total = total + specialArtRate[turnRate.value] + memoriaRate;
                    }
                });
            } else {
                thisTurnRate.forEach(turnRate => total = total + specialArtRate[turnRate.value]);
            }

            setTurn(total + previousTurnTotal);
            previousTurnTotal += total;
            total = 0;
        });
    }

    /* 清除用function */
    function ClearAllTurnRate() {
        SetNotToReRender(false);
        setTurns.forEach(setTurn => setTurn(0));
    }

    /* 進階設定用state */
    const [advancedCharacterNo, setAdvancedChaNo] = useState("1");
    const [advancedFirstTurn, setAdvancedFirstTurn] = useState("1");
    const [advancedLastTurn, setAdvancedLastTurn] = useState("2");
    const [advancedSARate, setAdvancedSARate] = useState("0");

    const advancedState = {
        "advancedCharacterNo": advancedCharacterNo,
        "advancedFirstTurn": advancedFirstTurn,
        "advancedLastTurn": advancedLastTurn,
        "advancedSARate": advancedSARate
    }

    const setAdvancedState = {
        "setAdvancedChaNo": setAdvancedChaNo,
        "setAdvancedFirstTurn": setAdvancedFirstTurn,
        "setAdvancedLastTurn": setAdvancedLastTurn,
        "setAdvancedSARate": setAdvancedSARate
    }

    /* 進階設定功能 */
    function SetAdvancedSetting() {

        // 如果前項大於等於後項就顯示警告訊息
        if (IsFirstTurnBiggerThanLastTurn()) {
            alert("請確認進階設定的前項回合小於後項回合");
            return;
        }

        // 若回合設定通過驗證就先設定表格內容不能被重新渲染
        SetNotToReRender(true);

        var chosenCharacter = document.querySelectorAll("[data-characterno='" + advancedCharacterNo + "']");

        chosenCharacter.forEach(function (thisCharacter) {
            var thisTurn = parseInt(thisCharacter.dataset.turn);

            if (thisTurn >= advancedFirstTurn && thisTurn <= advancedLastTurn) {
                thisCharacter.value = advancedSARate;
            }
        });
    }

    /* 檢核進階設定回合是否前項小於後項 */
    function IsFirstTurnBiggerThanLastTurn() {
        if (parseInt(advancedFirstTurn) >= parseInt(advancedLastTurn)) {
            return true;
        }

        return false;
    }

    /* 清除進階設定 */
    function ClearAdvancedSetting() {
        setAdvancedChaNo("1");
        setAdvancedFirstTurn("1")
        setAdvancedLastTurn("2");
        setAdvancedSARate("0");
    }

    return (
        <div id="specialArtCalculateContainer">
            <MemoriaSetting />
            <table id="specialArtCalculateTable">
                <thead>
                    <SpecialArtTableHeader />
                </thead>

                <tbody>
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} characterNo={"1"} />
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} characterNo={"2"} />
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} characterNo={"3"} />
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} characterNo={"4"} />
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} characterNo={"5"} />
                    <SpecialArtTableComponent battleTurns={battleTurns} notToReRender={notToReRender} characterNo={"6"} />
                    <SpecialArtTableRateFooter accumulationRate={turns} />
                    <SpecialArtTableTotalFooter accumulationRate={turns} />
                </tbody>
            </table>

            <div id="functionGroup">
                <input type="checkbox" id="advancedSettingBlockSwitch" />

                <div id="advancedSettingBlock">
                    <AdvancedSetting battleTurns={battleTurns} advancedState={advancedState} setAdvancedState={setAdvancedState} />
                    <button id="setAdvanced" onClick={SetAdvancedSetting}>設定</button>
                    <button id="clearAdvanced" onClick={ClearAdvancedSetting}>清除設定</button>
                </div>


                <label id="advancedSet" htmlFor="advancedSettingBlockSwitch">進階設定</label>
                <button id="calculate" onClick={SpecialArtRateCalculate}>計算</button>
                <button id="clear" onClick={ClearAllTurnRate}>清除</button>
            </div>
        </div>
    )
}

export default SpecialArt;