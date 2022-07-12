const OtherField = ({otherFieldState}) => {

    /** 設定select的value，不能直接使用物件裡的setState作為onChange的function **/
    function SetDropDownListValue(e){
        if(e.target.value === "true"){
            otherFieldState[e.target.id]["setState"](true);
            return;
        }else if(e.target.value === "false"){
            otherFieldState[e.target.id]["setState"](false);
            return;
        }
        otherFieldState[e.target.id]["setState"](e.target.value);
    }

    return (
        <div id="otherField" className="field">
            <h2 className="fieldTitle">其他區塊</h2>

            <label>是否爆擊：</label>
            <select id="isCritical" value={otherFieldState["isCritical"]["state"]} onChange={SetDropDownListValue}>
                <option value={true}>是</option>
                <option value={false}>否</option>
            </select>
            <span className="splitLine">｜</span>

            <label>是否貫穿：</label>
            <select id="isPenenstration" value={otherFieldState["isPenenstration"]["state"]} onChange={SetDropDownListValue}>
                <option value={true}>是</option>
                <option value={false}>否</option>
            </select>
            <br/>

            <label>對象是否格擋：</label>
            <select id="isGuarded" value={otherFieldState["isGuarded"]["state"]} onChange={SetDropDownListValue}>
                <option value={false}>否</option>
                <option value={true}>是</option>
            </select>
            <span className="splitLine">｜</span>

            <label>是否為戰爭遊戲模式：</label>
            <select id="isWarGameMode" value={otherFieldState["isWarGameMode"]["state"]} onChange={SetDropDownListValue}>
                <option value={false}>否</option>
                <option value={true}>是</option>
            </select>
        </div>
    )
}

export default OtherField;