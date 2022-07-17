import { useState } from 'react'
import { v4 } from 'uuid'

import MaxDamageTableComponent from '../component/maxDamage/maxDamageTableComponent';

import './maxDamage.css'

const MaxDamage = () => {

    // 整數驗證規則
    var positiveInputRule = new RegExp("^\\d*$");

    // 傷害範圍
    const damageRateRange = [1.04, 1.03, 1.02, 1.01, 1.00, 0.99, 0.98, 0.97, 0.96]

    /* useState */
    const [firstDamage, setFirstDamage] = useState("");
    const [secondDamage, setSecondDamage] = useState("");
    const [basicDamage, setBasicDamage] = useState(0);

    /* function */
    // set first damage state
    function set1stDamage(e) {
        var inputValue = e.target.value;

        if(positiveInputRule.test(inputValue) || inputValue === ""){
            setFirstDamage(inputValue);
            return;
        }

        alert("請輸入正整數");
    }

    // set second damage state
    function set2ndDamage(e) {
        var inputValue = e.target.value;

        if(positiveInputRule.test(inputValue) || inputValue === ""){
            setSecondDamage(inputValue);

            return;
        }

        alert("請輸入正整數");
    }

    // calculate damage 
    function damageCalculate() {
        // 如果第一個傷害和第二個傷害是0或預設的空字串，傷害基準就設為0
        if ((firstDamage === "0" && secondDamage === "0") || (firstDamage === "" && secondDamage === "")) {
            setBasicDamage(0);
            return;
        }

        setBasicDamage((secondDamage - firstDamage) / Math.round((secondDamage - firstDamage) * 100 / firstDamage) * 100);
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
                <input type="text" id="firstDamage" value={firstDamage} onChange={set1stDamage}></input>
                <p className="damageLabel">第二個傷害：</p>
                <input type="text" id="secondDamage" value={secondDamage} onChange={set2ndDamage}></input>
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