import { v4 } from 'uuid';

const SpecialArtTableRateFooter = ({accumulationRate}) => {
    return (
        <tr>
            <td>
                <b>累積計量</b>
            </td>
            {accumulationRate.map(turnRate => <td key={v4()}>{Math.round(turnRate*100)/100}</td>)}
        </tr>
    )
}

export default SpecialArtTableRateFooter;