import { useState } from 'react'
import { v4 } from 'uuid'

import MaxDamageTableComponent from '../component/maxDamage/maxDamageTableComponent';

import './maxDamage.css'

// 整數驗證規則
const positiveInputRule = new RegExp("^\\d*$");

// 傷害倍率範圍
const damageRateRange = [1.04, 1.03, 1.02, 1.01, 1.00, 0.99, 0.98, 0.97, 0.96]

function checkAndSetDamage(e, SetDamage) {
    let inputValue = e.target.value;

    if (positiveInputRule.test(inputValue) || inputValue === "") {
        SetDamage(inputValue);
    }
}

const MaxDamage = () => {

    /* useState */
    const [firstDamage, setFirstDamage] = useState("");
    const [secondDamage, setSecondDamage] = useState("");
    const [basicDamage, setBasicDamage] = useState(0);

    /* function */

    // calculate damage 
    function damageCalculate() {
        // 如果第一個傷害和第二個傷害是0或預設的空字串，傷害基準就設為0
        if ((firstDamage === "0" && secondDamage === "0") || (firstDamage === "" && secondDamage === "")) {
            setBasicDamage(0);
            return;
        }

        // 規則：傷害浮動範圍為基礎傷害值的0.96~1.04倍，間隔為0.01，因此除基礎傷害值外還有8個數字
        // 情境：在對應倍率未知的情況下獲取0.96~1.04間的其中兩個數字
        // 使用遍歷傷害1與傷害2除以倍率範圍內的值來產生所有可能的基礎傷害
        // 當兩個迴圈中有值的差小於等於1時就代表此數字為基礎傷害值，在以此數值去產生所有可能的傷害數值
        let damageArrayOne = damageRateRange.map(damageRate => (Math.round(firstDamage / damageRate)));
        let damageArrayTwo = damageRateRange.map(damageRate => (Math.round(secondDamage / damageRate)));

        // 若找到了就把值改為true來斷掉迴圈，以節省效能
        let isBasicDamageSet = false;

        damageArrayOne.forEach(damageOne => {
            if (isBasicDamageSet) {
                return;
            }

            damageArrayTwo.forEach(damageTwo => {
                if (Math.abs(damageOne - damageTwo) <= 1) {
                    setBasicDamage(damageOne);
                    isBasicDamageSet = true;
                }
            })
        });

        // 若基礎傷害值還未設定過，就說明沒有對應的傷害數值，因此報錯
        if (!isBasicDamageSet) {
            setBasicDamage(0);
            alert("請確認兩個傷害數值是在相同情況下產生");
        }
    }

    // clear input and result
    function clearResult() {
        setFirstDamage("");
        setSecondDamage("");
        setBasicDamage(0);
    }

    /* html */
    return <div id="maxDamageContainer">
        <div className="contentBox">
            <div id="damageInputBox">
                <p className="damageLabel">第一個傷害：</p>
                <input type="text" id="firstDamage" value={firstDamage} onChange={(e) => checkAndSetDamage(e, setFirstDamage)}></input>
                <p className="damageLabel">第二個傷害：</p>
                <input type="text" id="secondDamage" value={secondDamage} onChange={(e) => checkAndSetDamage(e, setSecondDamage)}></input>
                <br />
                <div id="maxDamageButtonGroup">
                    <button id="calculate" onClick={damageCalculate}>計算</button>
                    <button id="clear" onClick={clearResult}>清除</button>
                </div>
            </div>
        </div>
        <div className="contentBox">
            <table id="damageTable">
                <thead>
                    <tr>
                        <th>倍率</th>
                        <th>傷害數值</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        damageRateRange.map(damageRate => <MaxDamageTableComponent column1={damageRate} column2={Math.round(basicDamage * damageRate)} key={v4()} />)
                    }
                </tbody>
            </table>
        </div>
    </div>
}

export default MaxDamage;