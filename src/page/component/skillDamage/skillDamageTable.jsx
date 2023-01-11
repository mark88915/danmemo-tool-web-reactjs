import { v4 } from 'uuid'

const DamageRateRange = [0.96, 0.97, 0.98, 0.99, 1, 1.01, 1.02, 1.03, 1.04];

const SkillDamageTable = ({ basicDamage }) => {
    return (
        <div id="tableContainer">
            <table id="skillDamageTable">
                <thead>
                    <tr>
                        {DamageRateRange.map(damageRate => <td key={v4()}><b>{damageRate}</b></td>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {DamageRateRange.map(damageRate => <td key={v4()}>{Math.floor(damageRate * basicDamage)}</td>)}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SkillDamageTable;