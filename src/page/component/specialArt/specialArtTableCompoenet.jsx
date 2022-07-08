import SpecialArtSelectOptionComponent from "./specialArtSelectOptionComponent";

import { memo } from 'react';
import { v4 } from "uuid";

const SpecialArtTableComponent = memo(({ battleTurns }) => {
    return (
        <tr>
            <td><input type="text" className="characterName" placeholder="角色名稱(可不輸入)" /></td>
            {battleTurns.map(turn => <td key={v4()}><SpecialArtSelectOptionComponent turn={turn} key={v4()} /></td>)}
        </tr>
    )
}, (prevProps, nextProps) => {
    return nextProps.notToReRender;
})

export default SpecialArtTableComponent;