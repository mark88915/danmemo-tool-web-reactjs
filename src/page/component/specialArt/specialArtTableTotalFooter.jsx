import { v4 } from 'uuid';

const SpecialArtTableTotalFooter = ({accumulationRate}) => {
    return (
        <tr>
            <td>
                <b>累積必殺</b>
            </td>
            {accumulationRate.map(turnRate => <td key={v4()}>{Math.floor(turnRate/(13+8/9))}</td>)}
        </tr>
    )
}

export default SpecialArtTableTotalFooter;