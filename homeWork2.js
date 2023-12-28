function makeObjectDeepCopy(object) {
    if (typeof object !== 'object') {
        return object;
    }

    const copyObject = Array.isArray(object) ? [] : {};

    for (const key in object) {
        if (Array.isArray(object[key])) {
            copyObject[key] = object[key].map(item => makeObjectDeepCopy(item));
            continue;
        }

        if (typeof object[key] === 'object') {
            copyObject[key] = makeObjectDeepCopy(object[key]);
            continue;
        }

        copyObject[key] = object[key];
    }

    return copyObject;
}

function selectFromInterval(array, intervalValue1, intervalValue2) {
    if (!Array.isArray(array) || array.some(isNaN)) {
        throw new Error('Error!');
    }

    if (isNaN(intervalValue1) || isNaN(intervalValue2)) {
        throw new Error('Error!');
    }

    const startItem = Math.min(intervalValue1, intervalValue2);
    const finalItem = Math.max(intervalValue1, intervalValue2);

    const resultArray = array.filter(item => {
        return item >= startItem && item <= finalItem;
    });

    return resultArray;
}

function iterateObject() {
    if (
        this.from === undefined ||
        this.to === undefined ||
        typeof this.from !== 'number' ||
        typeof this.to !== 'number' ||
        isNaN(this.from) ||
        isNaN(this.to) ||
        this.to < this.from
    ) {
        throw new Error('Error!');
    }

    let current = this.from;
    const last = this.to;

    return {
        next() {
            if (current <= last) {
                return { done: false, value: current++ };
            } else {
                return { done: true };
            }
        },
    };
}

const myIterable = { [Symbol.iterator]: iterateObject };
