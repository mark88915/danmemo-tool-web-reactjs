const AdvancedSetting = ({ battleTurns, advancedState, setAdvancedState }) => {
    return (
        <div id="advancedSettings">
            <select id="advancedCharacterNo" value={advancedState.advancedCharacterNo} onChange={e => { setAdvancedState.setAdvancedChaNo(e.target.value) }}>
                <option value="1">角色1</option>
                <option value="2">角色2</option>
                <option value="3">角色3</option>
                <option value="4">角色4</option>
                <option value="5">角色5</option>
                <option value="6">角色6</option>
            </select>

            <select id="advancedFirstTurn" value={advancedState.advancedFirstTurn} onChange={e => { setAdvancedState.setAdvancedFirstTurn(e.target.value) }}>
                <option value="1">第1回合</option>
                <option value="2">第2回合</option>
                <option value="3">第3回合</option>
                <option value="4">第4回合</option>
                <option value="5">第5回合</option>
                <option value="6">第6回合</option>
                <option value="7">第7回合</option>
                <option value="8">第8回合</option>
                <option value="9">第9回合</option>
                <option value="10">第10回合</option>
                <option value="11">第11回合</option>
                <option value="12">第12回合</option>
                <option value="13">第13回合</option>
                <option value="14">第14回合</option>
            </select>

            ~

            <select id="advancedLastTurn" value={advancedState.advancedLastTurn} onChange={e => { setAdvancedState.setAdvancedLastTurn(e.target.value) }}>
                <option value="2">第2回合</option>
                <option value="3">第3回合</option>
                <option value="4">第4回合</option>
                <option value="5">第5回合</option>
                <option value="6">第6回合</option>
                <option value="7">第7回合</option>
                <option value="8">第8回合</option>
                <option value="9">第9回合</option>
                <option value="10">第10回合</option>
                <option value="11">第11回合</option>
                <option value="12">第12回合</option>
                <option value="13">第13回合</option>
                <option value="14">第14回合</option>
            </select>

            <select id="advancedSARate" value={advancedState.advancedSARate} onChange={e => { setAdvancedState.setAdvancedSARate(e.target.value) }}>
                <option value="0">未行動</option>
                <option value="0%">無增量</option>
                <option value="33%">33%</option>
                <option value="44%">44%</option>
                <option value="66%">66%</option>
                <option value="77%">77%</option>
                <option value="100%">100%</option>
                <option value="111%">111%</option>
                <option value="133%">133%</option>
                <option value="144%">144%</option>
                <option value="155%">155%</option>
                <option value="166%">167%</option>
                <option value="177%">178%</option>
                <option value="200%">200%</option>
                <option value="211%">211%</option>
                <option value="222%">222%</option>
                <option value="0">必殺</option>
            </select>
        </div>
    )
}

export default AdvancedSetting;