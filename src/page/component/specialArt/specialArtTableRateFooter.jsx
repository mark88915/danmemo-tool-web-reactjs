const SpecialArtTableRateFooter = ({accumulationRate}) => {
    return (
        <tr>
            <td>
                <b>累積計量</b>
            </td>
            {accumulationRate.map(turnRate => <td>{Math.round(turnRate*100)/100}</td>)}
        </tr>
    )
}

export default SpecialArtTableRateFooter;