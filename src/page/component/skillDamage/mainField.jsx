// 正整數驗證規則
const positiveInputRule = new RegExp("^\\d*$");

// 整數驗證規則
const inputRule = new RegExp("^-?\\d*$");

const MainField = ({ mainFieldState }) => {

    /** input檢核，只能輸入大於等於零的整數 **/
    function CheckPositiveInputIsLegal(e) {
        let inputValue = e.target.value;

        if (positiveInputRule.test(inputValue) || inputValue === "") {
            mainFieldState[e.target.id]["setState"](inputValue);
        }
    }

    /** input檢核，只能為正或負整數 **/
    function CheckInputIsLegal(e) {
        let inputValue = e.target.value;

        if (inputRule.test(inputValue) || inputValue === "") {
            mainFieldState[e.target.id]["setState"](inputValue);
        }
    }

    /** 設定select的value，不能直接使用物件裡的setState作為onChange的function **/
    function SetDropDownListValue(e) {
        if (e.target.value === "true") {
            mainFieldState[e.target.id]["setState"](true);
            return;
        } else if (e.target.value === "false") {
            mainFieldState[e.target.id]["setState"](false);
            return;
        }
        mainFieldState[e.target.id]["setState"](e.target.value);
    }

    return (
        <div id="mainField" className="field">
            <h2 className="fieldTitle">主要區塊</h2>

            <div className="fieldRow">
                <div className="fieldBlock">
                    <label>攻擊力：</label>
                    <input type="text" id="power" placeholder="面板物理 / 魔法攻擊" value={mainFieldState["power"]["state"]} onChange={CheckPositiveInputIsLegal} />
                </div>

                <div className="fieldBlock">
                    <label>主屬加乘總額：</label>
                    <input type="text" id="powerBuffRate" placeholder="力量 / 魔力Buff" value={mainFieldState["powerBuffRate"]["state"]} onChange={CheckInputIsLegal} />
                </div>
            </div>

            <div className="fieldRow">
                <div className="fieldBlock">
                    <label>是否有種族殺手：</label>
                    <select id="isKiller" value={mainFieldState["isKiller"]["state"]} onChange={SetDropDownListValue}>
                        <option value={false}>否</option>
                        <option value={true}>是</option>
                    </select>
                </div>

                <div className="fieldBlock">
                    <label>主屬發升：</label>
                    <select id="isSkillBoost" value={mainFieldState["isSkillBoost"]["state"]} onChange={SetDropDownListValue}>
                        <option value="noBoost">發動時無上升</option>
                        <option value="boost">發動時上升</option>
                        <option value="greatBoost">發動時大幅上升</option>
                    </select>
                </div>
            </div>

            <div className="fieldRow">
                <div className="fieldBlock">
                    <label>對象防禦力：</label>
                    <input type="text" id="enemyDefense" placeholder="PVE請設100" value={mainFieldState["enemyDefense"]["state"]} onChange={CheckPositiveInputIsLegal} />
                </div>

                <div className="fieldBlock">
                    <label>對象耐久加成：</label>
                    <input type="text" id="enemyDurability" value={mainFieldState["enemyDurability"]["state"]} onChange={CheckInputIsLegal} />
                </div>
            </div>

            <div className="fieldRow">
                <div className="fieldBlock">
                    <label>招式威力：</label>
                    <select id="skillPower" value={mainFieldState["skillPower"]["state"]} onChange={SetDropDownListValue}>
                        <option value={"normal-physical"}>物理普攻/反擊</option>
                        <option value={"normal-magic"}>魔法普攻/反擊</option>
                        <option value={"low"}>弱威力</option>
                        <option value={"mid"}>中威力</option>
                        <option value={"high"}>強威力</option>
                        <option value={"super"}>超威力</option>
                        <option value={"ultra"}>超強威力</option>
                    </select>
                </div>

                <div className="fieldBlock">
                    <label>攻擊對象：</label>
                    <select id="target" value={mainFieldState["target"]["state"]} onChange={SetDropDownListValue}>
                        <option value={"multi"}>全體</option>
                        <option value={"single"}>單體</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default MainField;