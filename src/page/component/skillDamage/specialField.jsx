const SpecialField = ({ specialFieldState }) => {

    /** input檢核，只能輸入大於零的正整數 **/
    function CheckInputIsLegal(e) {
        if (e.target.value >= 0 || e.target.value === "") {
            specialFieldState[e.target.id]["setState"](e.target.value);
        } else {
            alert("請輸入大於等於零的正整數");
        }
    }

    /** 設定select的value，不能直接使用物件裡的setState作為onChange的function **/
    function SetDropDownListValue(e) {
        if (e.target.value === "true") {
            specialFieldState[e.target.id]["setState"](true);
            return;
        } else if (e.target.value === "false") {
            specialFieldState[e.target.id]["setState"](false);
            return;
        }
        specialFieldState[e.target.id]["setState"](e.target.value);
    }

    /** 必殺Combo數檢核，最少1最多4 **/
    function CheckSpecialArtComboIsLegal(e) {
        if ((e.target.value >= 1 && e.target.value <= 4) || e.target.value === "") {
            specialFieldState[e.target.id]["setState"](e.target.value);
        } else {
            alert("請輸入介於1~4的正整數");
        }
    }

    return (
        <div id="specialField" className="field">
            <h2 className="fieldTitle">特殊區塊</h2>

            <div className="fieldRow">
                <div className="fieldBlock">
                    <label>屬性傷害總額：</label>
                    <input type="text" id="elementDamage" placeholder="含支援、眷族技能" value={specialFieldState["elementDamage"]["state"]} onChange={CheckInputIsLegal} />
                </div>

                <div className="fieldBlock">
                    <label>耐性降低總額：</label>
                    <input type="text" id="resist" placeholder="含物魔耐、屬耐" value={specialFieldState["resist"]["state"]} onChange={CheckInputIsLegal} />
                </div>
            </div>

            <div className="fieldRow">
                <div className="fieldBlock">
                    <label>特殊增傷總額：</label>
                    <input type="text" id="specialBoost" placeholder="每個OO使技能威力上升" value={specialFieldState["specialBoost"]["state"]} onChange={CheckInputIsLegal} />
                </div>

                <div className="fieldBlock">
                    <label>單體/群體耐性：</label>
                    <input type="text" id="targetResist" value={specialFieldState["targetResist"]["state"]} onChange={CheckInputIsLegal} />
                </div>
            </div>

            <div className="fieldRow">
                <div className="fieldBlock">
                    <label>被動增傷技能：</label>
                    <select id="developmentAbilityBoost" value={specialFieldState["developmentAbilityBoost"]["state"]} onChange={SetDropDownListValue}>
                        <option value={"noBoost"}>無增傷被動</option>
                        <option value={"strike"}>閃擊</option>
                        <option value={"piercingStrike"}>穿擊</option>
                        <option value={"trueStrike"}>真擊</option>
                        <option value={"counterAttack"}>反擊</option>
                    </select>
                </div>

                <div className="fieldBlock">
                    <label>被動增傷數值：</label>
                    <input type="text" id="developmentAbilityRate" value={specialFieldState["developmentAbilityRate"]["state"]} onChange={CheckInputIsLegal} />
                </div>
            </div>

            <div className="fieldRow">
                <div className="fieldBlock">
                    <label>武器革新：</label>
                    <select id="weaponUpgrade" value={specialFieldState["weaponUpgrade"]["state"]} onChange={SetDropDownListValue}>
                        <option value={"noUpgrage"}>未革新</option>
                        <option value={"level-Fourth"}>革新第四階段</option>
                        <option value={"fullUpgrade"}>革新滿</option>
                    </select>
                </div>

                <div className="fieldBlock">
                    <label>必殺Combo數：</label>
                    <input type="text" id="specialArtCombo" placeholder="請輸入1~4" value={specialFieldState["specialArtCombo"]["state"]} onChange={CheckSpecialArtComboIsLegal} />
                </div>
            </div>
        </div>
    )
}

export default SpecialField;