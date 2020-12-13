import {
    LIST_ELEMENT_INFO,
    LIST_EXCEPT_ATTACK_DRAGONS,
    LIST_EXCEPT_HEALTH_DRAGONS,
    LIST_BASE_GOLD_BY_TYPE
} from "./config";
import { isString, isEmpty, isObject, isArray } from "lodash";



Array.prototype.first = function (count) {
    return count ? this.slice(0, count) : this[0];
};

Array.prototype.last = function () {
    return this[this.length - 1];
};

Array.prototype.sum = function (callback) {
    return this.reduce(function (total, item, index) {
        if (typeof callback === 'function') {
            return total + callback(item, index);
        }

        return total + Number(item);
    }, 0);
};

Array.prototype.chunk = function (chunkSize) {
    var chunks = [];

    for (var i = 0; i < this.length; i += chunkSize) {
        chunks.push(this.slice(i, i + chunkSize));
    }

    return chunks;
};

Array.prototype.contains = function (item) {
    return this.indexOf(item) !== -1;
};

Array.prototype.remove = function (target) {
    this.forEach((item, index) => {
        if (item == target) {
            this.splice(index, 1);
        }
    });

    return this;
};

Array.prototype.random = function (amount) {

    if (typeof amount == 'number') {

        // Let's not grab more than we can.
        amount = Math.min(amount, this.length);

        var items = [];

        while (items.length < amount) {
            var item = this.random();

            if (!items.contains(item)) {
                items.push(item);
            }
        }

        return items;
    }

    var randomIndex = Math.floor(Math.random() * this.length);

    return this[randomIndex];
};

String.prototype.remove = function (str) {
    return this.replace(str, '');
};

String.prototype.contains = function (string) {
    return this.indexOf(string) !== -1;
};

String.prototype.capitalize = function () {
    return this[0].toUpperCase() + this.slice(1).toLowerCase();
};

export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;;
}

export function times(times, callback) {
    for (var i = 0; i < times; i++) {
        callback(i);
    }
}

export function calculateDragonGoldProduction(baseGold, level) {
    if (level == 0) {
        return 0;
    }

    return Math.round(baseGold / 14.44) * 4 * level + baseGold - Math.round(baseGold / 14.44) * 4;
}

export function formatNumber(number, delimiter) {
    delimiter = delimiter || ' ';

    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
}

export function selectField(event) {
    event.target.select();
}

export function checkArrayValues(array, minNumber) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] < minNumber) {
            return false;
        }
    }

    return true;
}

export function calculateTempleLevel(dragonLevels, element) {
    if (element == 'Legendary') {
        if (dragonLevels.length >= 4 && checkArrayValues(dragonLevels.first(4), 45)) {
            return 5;
        }
        else if (dragonLevels.length >= 3 && checkArrayValues(dragonLevels.first(3), 30)) {
            return 4;
        }
        else if (dragonLevels.length >= 2 && checkArrayValues(dragonLevels.first(2), 20)) {
            return 3;
        }
        else if (dragonLevels.length >= 1 && checkArrayValues(dragonLevels.first(1), 15)) {
            return 2;
        }
    }
    else {
        if (dragonLevels.length >= 5 && checkArrayValues(dragonLevels.first(5), 45)) {
            return 5;
        }
        else if (dragonLevels.length >= 5 && checkArrayValues(dragonLevels.first(5), 30)) {
            return 4;
        }
        else if (dragonLevels.length >= 4 && checkArrayValues(dragonLevels.first(4), 20)) {
            return 3;
        }
        else if (dragonLevels.length >= 3 && checkArrayValues(dragonLevels.first(3), 15)) {
            return 2;
        }
    }

    return 1;
}

export function formatShortNumber(number) {

    // Alter numbers larger than 1k
    if (number >= 1e4) {
        var units = ["k", "M", "B", "T"];
        var order = Math.floor(Math.log(number) / Math.log(1000));
        var unit = units[order - 1];
        var num = number / Math.pow(1000, order);
        var fixedNum = num.toFixed(2).remove('.00');

        return fixedNum + unit;
    }

    return number.toLocaleString()
}

export function calculateFoodCost(oldLevel, newLevel, shortFormat) {
    oldLevel = Number(oldLevel);
    newLevel = Number(newLevel);
    let foodCost = foodCostLevels.slice(Math.min(oldLevel, newLevel), Math.max(oldLevel, newLevel)).sum();

    if (newLevel < oldLevel) {
        foodCost = 0;
    }

    if (shortFormat) {
        return formatShortNumber(foodCost);
    }

    return foodCost;
}

let foodCostLevels = [
    0, 4, 8, 16, 40, 80, 160, 320, 640, 1280, 2560, 5120, 6400, 8400, 12000, 16000, 20500, 25000, 35000, 50000,
    65000, 82500, 100000, 120000, 150000, 180000, 216000, 252000, 288000, 324000, 364000, 412000, 460000, 512000,
    568000, 632000, 696000, 768000, 844000, 924000, 1012000, 1104000, 1200000, 1304000, 1416000, 1532000, 1656000,
    1788000, 1928000, 2072000, 2228000, 2388000, 2560000, 2736000, 2924000, 3120000, 3324000, 3540000, 3764000,
    4000000, 4200000, 4400000, 4600000, 4800000, 5000000, 5200000, 5400000, 5600000, 5800000, 6000000, 6200000,
    6400000, 6600000, 6800000, 7000000, 7200000, 7400000, 7600000, 7800000, 8000000, 8000000, 8000000, 8000000,
    8000000, 8000000, 8000000, 8000000, 8000000, 8000000, 8000000, 8000000, 8000000, 8000000, 8000000, 8000000,
    8000000, 8000000, 8000000, 8000000, 8000000
];

export function generateRandomDragonName() {
    return [
        'Adel', 'Alex', 'Amuk', 'Andr', 'Arbo', 'Arch', 'Arti', 'Aruk', 'Atil', 'Azer', 'Azur',
        'Bala', 'Bale', 'Bela', 'Bern', 'Bogi', 'Boti', 'Char', 'Cica', 'Claw', 'Clay', 'Clif',
        'Cour', 'Crys', 'Csil', 'Cubi', 'Dako', 'Dani', 'Dave', 'Daxy', 'Deak', 'Dean', 'Dear',
        'Demy', 'Dena', 'Dere', 'Derr', 'Deur', 'Diam', 'Diem', 'Doma', 'Dona', 'Drac', 'Dreg',
        'Drio', 'Duba', 'Ebon', 'Eddu', 'Ekel', 'Elen', 'Elmo', 'Emek', 'Emte', 'Eque', 'Erhm',
        'Erik', 'Erpp', 'Esso', 'Esth', 'Eyok', 'Famo', 'Faro', 'Fear', 'Feel', 'Fenr', 'Fiko',
        'Fior', 'Flap', 'Floz', 'Fold', 'Frag', 'Gabo', 'Gadu', 'Gava', 'Gelb', 'Gemm', 'Geri',
        'Ghis', 'Gibo', 'Glan', 'Hama', 'Hana', 'Haro', 'Heka', 'Here', 'Hodi', 'Hopi', 'Hopp',
        'Hrah', 'Hren', 'Huma', 'Huon', 'Igor', 'Ilan', 'Imea', 'Imre', 'Ivor', 'Jama', 'Joco',
        'Joke', 'Jorm', 'Julo', 'Kala', 'Kale', 'Kamo', 'Kepo', 'Kojt', 'Koln', 'Korm', 'Lakk',
        'Lanz', 'Lath', 'Lava', 'Leon', 'Less', 'Lipa', 'Loga', 'Loro', 'Lotr', 'Lova', 'Lump',
        'Maci', 'Maly', 'Marc', 'Mari', 'Mart', 'Mate', 'Mede', 'Meli', 'Meno', 'Mera', 'Mert',
        'Meta', 'Mile', 'Mizo', 'Mleh', 'Moak', 'Mold', 'Mona', 'Naor', 'Nelt', 'Nial', 'Nimr',
        'Nito', 'Nost', 'Nozd', 'Nuki', 'Nyak', 'Odyn', 'Ogan', 'Olmi', 'Olom', 'Onte', 'Onyx',
        'Orpa', 'Osth', 'Otor', 'Paff', 'Pali', 'Pamo', 'Paol', 'Papp', 'Para', 'Pass', 'Peog',
        'Pepp', 'Pikk', 'Pipp', 'Pixe', 'Polt', 'Poth', 'Preh', 'Prui', 'Punn', 'Pyth', 'Quez',
        'Quor', 'Raid', 'Raig', 'Rake', 'Rapp', 'Rast', 'Razv', 'Rell', 'Remy', 'Rhae', 'Rolt',
        'Romo', 'Ruby', 'Sali', 'Sany', 'Saol', 'Sapp', 'Seir', 'Seth', 'Siva', 'Sivo', 'Smau',
        'Snap', 'Soar', 'Soil', 'Spur', 'Suna', 'Sunf', 'Susu', 'Synn', 'Taki', 'Tear', 'Teke',
        'Texe', 'Tiam', 'Tini', 'Tolo', 'Topa', 'Troz', 'Typh', 'Ubun', 'Umpa', 'Uppa', 'Vala',
        'Valr', 'Verm', 'Vhag', 'Vise', 'Voxe', 'Vukk', 'Wama', 'Wixe', 'Yser', 'Zmey', 'Zoma',
        'Zsol',
    ].random();
}

export function calculateCollectorPoints(type, level, enchantmentLevel) {

    // Collector Points are calculated only for hatched dragons.
    if (level == 0) {
        return 0;
    }

    var typePoints = {
        COMMON: 10,
        UNCOMMON: 20,
        RARE: 50,
        EPIC: 100,
        LEGENDARY: 200,
        DIVINE: 400,
        ANCIENT: 400,
        BOSS: 250,
    };
    var totalPoints = typePoints[type];

    if (level && type != 'BOSS') {
        var enchantmentLevelModifier = [
            1,
            1.1, 1.15, 1.2, 1.3,
            1.4, 1.5, 1.65, 1.75
        ];

        totalPoints *= enchantmentLevelModifier[enchantmentLevel || 0];
        totalPoints += level * 5;
    }

    return Math.round(totalPoints);
}

export function convertMinutesToDurationString(minutes) {
    var timeSegments = [];

    if (minutes > 24 * 60) {
        var days = Math.floor(minutes / 60 / 24);
        timeSegments.push(`${days}d`);

        minutes -= days * 24 * 60;
    }

    if (minutes >= 60) {
        var hours = Math.floor(minutes / 60);
        timeSegments.push(`${hours}h`);

        minutes -= hours * 60;
    }

    if (minutes >= 1) {
        var remainingMinutes = Math.floor(minutes);
        timeSegments.push(`${remainingMinutes}m`);

        minutes -= remainingMinutes;
    }

    if (minutes) {
        timeSegments.push(`${minutes * 60}s`);
    }

    return timeSegments.join(' ');
}

export function calculateBreedingChances(dragons) {
    var chances = {};
    var rarityWeights = {
        'COMMON': 1,
        'UNCOMMON': 2,
        'RARE': 3,
        'EPIC': 4,
        'LEGENDARY': 5,
        'DIVINE': 6,
    };
    var weights = [];
    var highestRarity = (dragons.slice().sort((dragon1, dragon2) => {
        return rarityWeights[dragon1.type] > rarityWeights[dragon2.type] ? -1 : 1;
    })[0] || {}).type;

    dragons.forEach(dragon => {
        var diffFromHighestRarity = rarityWeights[highestRarity] - rarityWeights[dragon.type];

        if (dragon.type == highestRarity) {
            weights.push(dragon.name);
        }
        else {
            for (var i = 0; i <= diffFromHighestRarity; i++) {
                weights.push(dragon.name);
            }
        }
    });

    dragons.forEach(dragon => {
        chances[dragon.name] = weights.filter(d => {
            return d == dragon.name;
        }).length / weights.length * 100;
    });

    return chances;
}

export function calculateVipTime(time) {
    if (!time) {
        return null;
    }

    var seconds = convertTimeStringToSeconds(time) * 0.8; // VIP breeding is 20% faster

    return convertSecondsToTimeString(seconds);
}

export function convertSecondsToTimeString(seconds) {
    var days = Math.floor(seconds / 86400);
    seconds = seconds % 86400;
    var hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    seconds = Math.round(seconds % 60);

    var durationPieces = [
        days + 'd',
        hours + 'h',
        minutes + 'm',
        seconds + 's',
    ].filter(piece => {
        return piece[0] > 0;
    });

    return durationPieces.join(' ');
}

export function lowerFirst(value1, value2) {
    return (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
}

export function higherFirst(value1, value2) {
    return (value1 > value2) ? -1 : (value1 < value2) ? 1 : 0;
}

/**
 * Number.prototype.format(n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

export function displayNumber(num, n, x, s, c) {
    return Number(num).format(n, x, s, c);
}

// 12345678.9.format(2, 3, '.', ',');  // "12.345.678,90"
// 123456.789.format(4, 4, ' ', ':');  // "12 3456:7890"
// 12345678.9.format(0, 3, '-');       // "12-345-679"

export function calcBaseAttack(dragonName, elements, type) {
    if (!isString(dragonName)) return '---';
    if (!isArray(elements)) return '---';
    if (!isString(type)) return '---';
    if (LIST_EXCEPT_ATTACK_DRAGONS.has(dragonName)) {
        return LIST_EXCEPT_ATTACK_DRAGONS.get(dragonName);
    }
    let attack = 60;
    let sumAttackElement = 0;
    let uppercaseType = isString(type) ? type.toUpperCase() : type;
    elements.forEach((element) => {
        const uppercaseElement = isString(element) ? element.toUpperCase() : element;
        if (LIST_ELEMENT_INFO.has(uppercaseElement)) {
            const eleInfo = LIST_ELEMENT_INFO.get(uppercaseElement);
            sumAttackElement += eleInfo.baseAttack;
        }
    });
    attack += Math.round(sumAttackElement);
    if (uppercaseType === "BOSS") {
        attack *= 4;
    }
    return attack;
}

export function calcBaseHealth(dragonName, elements, type) {
    if (!isString(dragonName)) return '---';
    if (!isArray(elements)) return '---';
    if (!isString(type)) return '---';
    if (LIST_EXCEPT_HEALTH_DRAGONS.has(dragonName)) {
        return LIST_EXCEPT_HEALTH_DRAGONS.get(dragonName);
    }
    let health = 200;
    let sumHealthElement = 0;
    let uppercaseType = isString(type) ? type.toUpperCase() : type;
    elements.forEach((element) => {
        const uppercaseElement = isString(element) ? element.toUpperCase() : element;
        if (LIST_ELEMENT_INFO.has(uppercaseElement)) {
            const eleInfo = LIST_ELEMENT_INFO.get(uppercaseElement);
            sumHealthElement += eleInfo.baseHealth;
        }
    });
    health += Math.round(sumHealthElement);
    if (uppercaseType === "BOSS") {
        health *= 4;
    }
    return health;
}

export function calcBaseGold(elements, type) {
    if (!isArray(elements)) return '---';
    if (!isString(type)) return '---';
    let baseGold = 180;
    let sumGoldElement = 0;
    let uppercaseType = isString(type) ? type.toUpperCase() : type;
    elements.forEach((element) => {
        const uppercaseElement = isString(element) ? element.toUpperCase() : element;
        if (LIST_ELEMENT_INFO.has(uppercaseElement)) {
            const eleInfo = LIST_ELEMENT_INFO.get(uppercaseElement);
            sumGoldElement += eleInfo.baseGold;
        }
    });
    baseGold += sumGoldElement;
    if (LIST_BASE_GOLD_BY_TYPE.has(uppercaseType)) {
        baseGold += LIST_BASE_GOLD_BY_TYPE.get(uppercaseType);
    }
    return baseGold;
}



