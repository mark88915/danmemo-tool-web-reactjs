import { useState } from 'react';
import MainField from '../component/skillDamage/mainField';
import OtherField from '../component/skillDamage/otherField';
import SkillDamageTable from '../component/skillDamage/skillDamageTable';
import SpecialField from '../component/skillDamage/specialField';
import './skillDamage.css'

const SkillDamage = () => {
    /** start of main field **/
    const [power, SetPower] = useState("");
    const [powerBuffRate, SetPowerBuffRate] = useState("");
    const [isKiller, SetIsKiller] = useState(false);
    const [isSkillBoost, SetIsSkillBoost] = useState("noBoost");
    const [enemyDefense, SetEnemyDefense] = useState("");
    const [enemyDurability, SetEnemyDurability] = useState("");
    const [skillPower, SetSkillPower] = useState("normal-physical");
    const [target, SetTarget] = useState("multi");

    const mainFieldState = {
        "power": { "state": power, "setState": SetPower },
        "powerBuffRate": { "state": powerBuffRate, "setState": SetPowerBuffRate },
        "isKiller": { "state": isKiller, "setState": SetIsKiller },
        "isSkillBoost": { "state": isSkillBoost, "setState": SetIsSkillBoost },
        "enemyDefense": { "state": enemyDefense, "setState": SetEnemyDefense },
        "enemyDurability": { "state": enemyDurability, "setState": SetEnemyDurability },
        "skillPower": { "state": skillPower, "setState": SetSkillPower },
        "target": { "state": target, "setState": SetTarget }
    }
    /** end of main field **/

    /** start of special field **/
    const [elementDamage, SetElementDamage] = useState("");
    const [resist, SetResist] = useState("");
    const [specialBoost, SetSpecialBoost] = useState("");
    const [targetResist, SetTargetResist] = useState("");
    const [developmentAbilityBoost, SetDevelopmentAbilityBoost] = useState("noBoost");
    const [developmentAbilityRate, SetDevelopmentAbilityRate] = useState("");
    const [weaponUpgrade, SetWeaponUpgrade] = useState("noUpgrage");
    const [specialArtCombo, SetSpecialArtCombo] = useState("");

    const specialFieldState = {
        "elementDamage": { "state": elementDamage, "setState": SetElementDamage },
        "resist": { "state": resist, "setState": SetResist },
        "specialBoost": { "state": specialBoost, "setState": SetSpecialBoost },
        "targetResist": { "state": targetResist, "setState": SetTargetResist },
        "developmentAbilityBoost": { "state": developmentAbilityBoost, "setState": SetDevelopmentAbilityBoost },
        "developmentAbilityRate": { "state": developmentAbilityRate, "setState": SetDevelopmentAbilityRate },
        "weaponUpgrade": { "state": weaponUpgrade, "setState": SetWeaponUpgrade },
        "specialArtCombo": { "state": specialArtCombo, "setState": SetSpecialArtCombo }
    }
    /** end of special field **/

    /** start of other field **/
    const [isCritical, SetIsCritical] = useState(true);
    const [isPenenstration, SetIsPenenstration] = useState(true);
    const [isGuarded, SetIsGuarded] = useState(false);
    const [isWarGameMode, SetIsWarGameMode] = useState(false);

    const otherFieldState = {
        "isCritical": { "state": isCritical, "setState": SetIsCritical },
        "isPenenstration": { "state": isPenenstration, "setState": SetIsPenenstration },
        "isGuarded": { "state": isGuarded, "setState": SetIsGuarded },
        "isWarGameMode": { "state": isWarGameMode, "setState": SetIsWarGameMode }
    }
    /** end of other field **/

    // 傷害State
    const [basicDamage, SetBasicDamage] = useState(0);

    /** 傷害係數對照，格式[skillPower][target] **/
    const skillPowerRateObj = {
        "normal-physical": { "multi": "沒有全體普通攻擊/反擊", "single": 2 },
        "normal-magic": { "multi": "沒有全體魔法攻擊/反擊", "single": 1.5 },
        "low": { "multi": 2.2, "single": 3 },
        "middle": { "multi": 2.3, "single": 3.4 },
        "high": { "multi": 2.4, "single": 3.8 },
        "super": { "multi": 2.8, "single": 4.2 },
        "ultra": { "multi": 7.2, "single": 8 }
    }

    /** 主屬發升對照，格式[target][skillPower][isSkillBoost] **/
    const skillBoostRateObj = {
        "multi": {
            "normal-physical": { "boost": "沒有全體的普通攻擊/反擊", "greatBoost": "沒有全體的普通攻擊/反擊" },
            "normal-magic": { "boost": "沒有全體的魔法攻擊/反擊", "greatBoost": "沒有全體的魔法攻擊/反擊" },
            "low": { "boost": "沒有【全體弱威力發動時上升】技能", "greatBoost": "沒有【全體弱威力發動時大幅上升】技能" },
            "middle": { "boost": 0.4, "greatBoost": "沒有【全體中威力發動時大幅上升】技能" },
            "high": { "boost": 0.4, "greatBoost": "沒有【全體強威力發動時大幅上升】技能" },
            "super": { "boost": 0.4, "greatBoost": "沒有【全體超威力發動時大幅上升】技能" },
            "ultra": { "boost": 0.4, "greatBoost": 0.7 }
        },
        "single": {
            "normal-physical": { "boost": "單體的普通攻擊/反擊不會發動時上升", "greatBoost": "單體的普通攻擊/反擊不會發動時大幅上升" },
            "normal-magic": { "boost": "單體的魔法攻擊/反擊不會發動時上升", "greatBoost": "沒有單體的魔法攻擊/反擊不會發動時大幅上升" },
            "low": { "boost": 0.4, "greatBoost": "沒有【單體弱威力發動時大幅上升】技能" },
            "middle": { "boost": 0.3, "greatBoost": "沒有【單體中威力發動時大幅上升】技能" },
            "high": { "boost": 0.3, "greatBoost": 0.7 },
            "super": { "boost": 0.4, "greatBoost": 0.7 },
            "ultra": { "boost": 0.4, "greatBoost": 0.7 }
        }
    }

    /** 計算function **/
    function CheckAndCalculateSkillDamage() {
        /** 種族殺手 **/
        var killerRate = isKiller ? 1.5 : 1;

        /** 主屬發升 **/
        var skillBoostRate;
        if (isSkillBoost === "noBoost") {
            skillBoostRate = 0;
        } else if (typeof skillBoostRateObj[target][skillPower][isSkillBoost] === "string") { // 如果沒有對應數字，就設定錯誤訊息並return
            SetBasicDamage(skillBoostRateObj[target][skillPower][isSkillBoost]);
            return;
        } else {
            skillBoostRate = skillBoostRateObj[target][skillPower][isSkillBoost];
        }

        /** 貫穿降防 **/
        var enemyPenenstratedRate = isPenenstration ? 0.5 : 1;

        /** 威力係數 **/
        // 如果沒有對應數字，就設定錯誤訊息並return
        if (typeof skillPowerRateObj[skillPower][target] === "string") {
            SetBasicDamage(skillPowerRateObj[skillPower][target]);
            return;
        }
        var skillPowerRate = skillPowerRateObj[skillPower][target];

        /** 檢核貫穿與格擋 **/
        if (isPenenstration && isGuarded) {
            SetBasicDamage("貫穿與格擋不會同時發生");
            return;
        }

        /** 被動增傷 **/
        var developmentAbilityBoostRate = 0;
        /**
        情境1：如果發展能力為閃擊且有發生爆擊
        情境2：如果發展能力為穿擊且有發生貫穿
        情境3：如果發展能力為反擊且攻擊方式為反擊
        情境4：如果發展能力為真擊且只有發生爆擊或貫穿
        ※以上情境皆等同輸入的被動增傷數值
        情境5：如果發展能力為真擊且同時發生爆擊與貫穿，就把輸入的被動增傷數值乘二
        ※若以上皆非就設定為0
        **/
        if ((developmentAbilityBoost === "strike" && isCritical) || (developmentAbilityBoost === "piercingStrike" && isPenenstration) || (developmentAbilityBoost === "counterAttack" && skillPower.includes("normal"))) {
            developmentAbilityBoostRate = developmentAbilityRate / 100;
        } else if (developmentAbilityBoost === "trueStrike") {
            if (isCritical && isPenenstration) {
                developmentAbilityBoostRate = developmentAbilityRate / 100 * 2;
            } else if (isCritical || isPenenstration) {
                developmentAbilityBoostRate = developmentAbilityRate / 100;
            }
        }

        /** 武器增傷 **/
        /** 
        情境1：如果武器革新第四階段且攻擊時發生貫穿，傷害上升3%
        情境2：如果武器革新滿但攻擊時只發生爆擊或貫穿，傷害上升3%
        情境3：如果武器革新滿且攻擊時同時發生爆擊與貫穿，傷害上升6%
        **/
        var weaponUpgradeBoostRate = 0;
        if (weaponUpgrade === "level-Fourth" && isPenenstration) {
            weaponUpgradeBoostRate = 0.03;
        } else if (weaponUpgrade === "fullUpgrade") {
            if (isCritical && isPenenstration) {
                weaponUpgradeBoostRate = 0.06;
            } else if (isCritical || isPenenstration) {
                weaponUpgradeBoostRate = 0.03;
            }
        }

        /** 必殺combo數增傷 **/
        var specialArtComboBoostRate = specialArtCombo === "" ? 1 : specialArtCombo;

        /** 爆擊傷害(爆擊本身就會提高50%傷害，與爆擊增傷被動不同) **/
        var criticalBoostRate = isCritical ? 1.5 : 1;

        /** 敵方格擋降傷 **/
        var enemyGuardRate = isGuarded ? 0.5 : 1;

        /** 戰爭遊戲降傷 **/
        var warGameModeRate = isWarGameMode ? 0.2 : 1;

        /** 攻擊力相關數值部分 **/
        var powerPart = Math.floor(Math.floor(Math.floor(power * (1 + powerBuffRate / 100)) * killerRate) * (1 + skillBoostRate));

        /** 敵方防禦相關數值部分 **/
        var enemyDefensePart = Math.floor(Math.floor(enemyDefense * (1 + enemyDurability / 100)) * enemyPenenstratedRate) / 2

        /** 計算公式參考此篇：https://forum.gamer.com.tw/C.php?bsn=31981&snA=4012&tnum=5&bPage=2 **/
        SetBasicDamage(Math.floor((powerPart - enemyDefensePart) * skillPowerRate * (1 + specialBoost / 100) * (1 + elementDamage / 100) * (1 + resist / 100) * (1 + targetResist / 100) * (1 + developmentAbilityBoostRate + weaponUpgradeBoostRate) * (1 + 0.2 * (specialArtComboBoostRate - 1)) * criticalBoostRate * enemyGuardRate * warGameModeRate));
    }

    /** 清除所有欄位 **/
    function ClearSkillDamage() {
        SetPower("");
        SetPowerBuffRate("");
        SetIsKiller(false);
        SetIsSkillBoost("noBoost");
        SetEnemyDefense("");
        SetEnemyDurability("");
        SetSkillPower("normal-physical");
        SetTarget("multi");

        SetElementDamage("");
        SetResist("");
        SetSpecialBoost("");
        SetTargetResist("");
        SetDevelopmentAbilityBoost("noBoost");
        SetDevelopmentAbilityRate("");
        SetWeaponUpgrade("noUpgrage");
        SetSpecialArtCombo("");

        SetIsCritical(true);
        SetIsPenenstration(true);
        SetIsGuarded(false);
        SetIsWarGameMode(false);

        SetBasicDamage(0);
    }

    return (
        <div id="skillDamageContainer">
            <div id="skillDamageDataForm">
                <h5 id="notification">※百分比請直接輸入數字，如80%請輸入80</h5>
                <MainField mainFieldState={mainFieldState} />
                <SpecialField specialFieldState={specialFieldState} />
                <OtherField otherFieldState={otherFieldState} />
                {
                    typeof basicDamage === "string"
                    ? <h1>{basicDamage}</h1>
                    :<SkillDamageTable basicDamage={basicDamage} />
                }
                <div id="skillDamagebuttonGroup">
                    <button id="calculate" onClick={CheckAndCalculateSkillDamage}>計算</button>
                    <button id="clear" onClick={ClearSkillDamage}>清除</button>
                </div>
            </div>
        </div>
    )
}

export default SkillDamage;