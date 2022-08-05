const SpecialArtSelectOptionComponent = ({turn, characterNo}) => {
    return (
        <select className={turn} data-turn={turn} data-characterno={characterNo}>
            <option value="0">未行動</option>
            <option value="0%">無增量</option>
            <option value="33%">33%</option>
            <option value="66%">67%</option>
            <option value="100%">100%</option>
            <option value="111%">111%</option>
            <option value="133%">133%</option>
            <option value="144%">144%</option>
            <option value="166%">167%</option>
            <option value="177%">178%</option>
            <option value="200%">200%</option>
            <option value="211%">211%</option>
            <option value="0">必殺</option>
        </select>
    )
}

export default SpecialArtSelectOptionComponent;