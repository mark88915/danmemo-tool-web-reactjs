const MemoriaSetting = () => {
    return (
        <div id="MemoriaSetting">
            <div>
                <label htmlFor="MemoriaSettingCheck">啟用增量記憶</label>
                <input type="checkbox" id="MemoriaSettingCheck"></input>
            </div>
            <div>
                <label>增量幅度：</label>
                <select id="MemoriaSpecialArtRate">
                    <option value="11%">11%</option>
                    <option value="22%">22%</option>
                    <option value="33%">33%</option>
                    <option value="44%">44%</option>
                </select>
            </div>
        </div>
    )
}

export default MemoriaSetting;