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


const colors = ["red", "orange", "yellow"];

const generateRandomLinePair = (width: number, height: number, total: number) => {
    const output: Lines[] = [];
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