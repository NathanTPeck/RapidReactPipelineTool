const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

type Line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

type Lines = {
    line1: Line;
    line2: Line;
    line3: Line;
    line4: Line;
    color: string;
}

export const squares: Lines[] = [{
        line1: {
            x1: 1141,
            y1: 270,
            x2: 1141,
            y2: 710
        },
        line2: {
            x1: 1141,
            y1: 270,
            x2: 1141,
            y2: 710
        },
        line3: {
            x1: 1581,
            y1: 710,
            x2: 1581,
            y2: 270
        },
        line4:{
            x1: 1581,
            y1: 270,
            x2: 1141,
            y2: 270
        },
        color: "red"
    },
    {
        line1: {
            x1: 855,
            y1: 193,
            x2: 855,
            y2: 871
        },
        line2: {
            x1: 855,
            y1: 871,
            x2: 1533,
            y2: 871
        },
        line3: {
            x1: 1533,
            y1: 871,
            x2: 1533,
            y2: 193
        },
        line4: {
            x1: 1533,
            y1: 193,
            x2: 855,
            y2: 193
        },
        color: "yellow"
    },
    {
        line1: {
            x1: 632,
            y1: 328,
            x2: 1192,
            y2: 888
        },
        line2: {
            x1: 1192,
            y1: 888,
            x2: 1752,
            y2: 328
        },
        line3: {
            x1: 1752,
            y1: 328,
            x2: 1192,
            y2: -232
        },
        line4: {
            x1: 1192,
            y1: -232,
            x2: 632,
            y2: 328
        },
        color: "red"
    },
    {
        line1: {
            x1: 76,
            y1: 143,
            x2: 76,
            y2: 465
        },
        line2: {
            x1: 76,
            y1: 465,
            x2: 398,
            y2: 465
        },
        line3: {
            x1: 398,
            y1: 465,
            x2: 398,
            y2: 143
        },
        line4: {
            x1: 398,
            y1: 143,
            x2: 76,
            y2: 143
        },
        color: "red"
    },
    {
        line1: {
            x1: 1601,
            y1: 350,
            x2: 1601,
            y2: 846
        },
        line2: {
            x1: 1601,
            y1: 846,
            x2: 2097,
            y2: 846
        },
        line3: {
            x1: 2097,
            y1: 846,
            x2: 2097,
            y2: 350
        },
        line4: {
            x1: 2097,
            y1: 350,
            x2: 1601,
            y2: 350
        },
        color: "yellow"
    },
    {
        line1: {
            x1: 75,
            y1: 156,
            x2: 634,
            y2: 715
        },
        line2: {
            x1: 634,
            y1: 715,
            x2: 1193,
            y2: 156
        },
        line3: {
            x1: 1193,
            y1: 156,
            x2: 634,
            y2: -403
        },
        line4: {
            x1: 634,
            y1: -403,
            x2: 75,
            y2: 156
        },
        color: "orange"
    },
    {
        line1: {
            x1: 17,
            y1: 86,
            x2: 17,
            y2: 765
        },
        line2: {
            x1: 17,
            y1: 765,
            x2: 696,
            y2: 765
        },
        line3: {
            x1: 696,
            y1: 765,
            x2: 696,
            y2: 86
        },
        line4: {
            x1: 696,
            y1: 86,
            x2: 17,
            y2: 86
        },
        color: "yellow"
    },
    {
        line1: {
            x1: 1863,
            y1: 51,
            x2: 1863,
            y2: 617
        },
        line2: {
            x1: 1863,
            y1: 617,
            x2: 2429,
            y2: 617
        },
        line3: {
            x1: 2429,
            y1: 617,
            x2: 2429,
            y2: 51
        },
        line4: {
            x1: 2429,
            y1: 51,
            x2: 1863,
            y2: 51
        },
        color: "yellow"
    },
    {
        line1: {
            x1: 1202,
            y1: 101,
            x2: 2054,
            y2: 953
        },
        line2: {
            x1: 2054,
            y1: 953,
            x2: 2906,
            y2: 101
        },
        line3: {
            x1: 2906,
            y1: 101,
            x2: 2054,
            y2: -751
        },
        line4: {
            x1: 2054,
            y1: -751,
            x2: 1202,
            y2: 101
        },
        color: "orange"
    },
    {
        line1: {
            x1: 2976,
            y1: 143,
            x2: 2976,
            y2: 465
        },
        line2: {
            x1: 2976,
            y1: 465,
            x2: 3298,
            y2: 465
        },
        line3: {
            x1: 3298,
            y1: 465,
            x2: 3298,
            y2: 143
        },
        line4: {
            x1: 3298,
            y1: 143,
            x2: 2976,
            y2: 143
        },
        color: "orange"
    },
    {
        line1: {
            x1: 3075,
            y1: 156,
            x2: 3634,
            y2: 715
        },
        line2: {
            x1: 3634,
            y1: 715,
            x2: 4193,
            y2: 156
        },
        line3: {
            x1: 4193,
            y1: 156,
            x2: 3634,
            y2: -403
        },
        line4: {
            x1: 3634,
            y1: -403,
            x2: 3075,
            y2: 156
        },
        color: "yellow"
    },
    {
        line1: {
            x1: 3601,
            y1: 350,
            x2: 3601,
            y2: 846
        },
        line2: {
            x1: 3601,
            y1: 846,
            x2: 4097,
            y2: 846
        },
        line3: {
            x1: 4097,
            y1: 846,
            x2: 4097,
            y2: 350
        },
        line4: {
            x1: 4097,
            y1: 350,
            x2: 3601,
            y2: 350
        },
        color: "red"
    },
]


const colors = ["red", "orange", "yellow"];

const generateRandomLinePair = (width: number, height: number, total: number) => {
    const output: Lines[] = []
    for (let i = 0; i < total; i++) {
        const startX = getRandomInt(width);
        const startY = getRandomInt(height);
        const length = getRandomInt(600) + 300;
        const color = colors[getRandomInt(3)];
        const isVertical = getRandomInt(2) === 0;

        switch (isVertical) {
            case true:
                output.push( {
                    line1: { x1: startX, y1: startY, x2: startX, y2: startY + length },
                    line2: { x1: startX, y1: startY + length, x2: startX + length, y2: startY + length },
                    line3: { x1: startX + length, y1: startY + length, x2: startX + length, y2: startY },
                    line4: { x1: startX + length, y1: startY, x2: startX, y2: startY },
                    color: color,
                });
            break;
            default:
                output.push( {
                    line1: { x1: startX, y1: startY, x2: startX + length, y2: startY + length },
                    line2: { x1: startX + length, y1: startY + length, x2: startX + 2 * length, y2: startY },
                    line3: { x1: startX + 2*length, y1: startY, x2: startX + length, y2: startY - length },
                    line4: { x1: startX + length, y1: startY - length, x2: startX, y2: startY },
                    color: color
                });
        }
    }
    return output;
};

export default generateRandomLinePair;