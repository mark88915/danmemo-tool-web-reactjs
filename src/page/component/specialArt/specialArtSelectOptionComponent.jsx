import { memo } from 'react';

const SpecialArtSelectOptionComponent = ({turn}) => {
    return (
        <select className={turn}>
            <option value="0">未行動</option>
            <option value="0%">無增量</option>
            <option value="33%">33%</option>
            <option value="66%">67%</option>
            <option value="100%">100%</option>
            <option value="111%">111%</option>
            <option value="133%">133%</option>
            <option value="144%">144%</option>
            <option value="200%">200%</option>
            <option value="211%">211%</option>
            <option value="0">必殺</option>
        </select>
    )
}

export default memo(SpecialArtSelectOptionComponent);