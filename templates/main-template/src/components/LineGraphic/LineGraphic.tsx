import React from "react";
import "./LineGraphic.css"

export const LineGraphic = () => {
    return (
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="line-graphic"
        >
            {squareSample.map((lines, i) => (
                <React.Fragment key={i}>
                    <line key={4 * i} x1={lines.line1.x1} y1={lines.line1.y1} x2={lines.line1.x2}
                          y2={lines.line1.y2}
                          stroke={lines.color} strokeWidth="3"/>
                    <line key={4 * i + 1} x1={lines.line2.x1} y1={lines.line2.y1} x2={lines.line2.x2}
                          y2={lines.line2.y2}
                          stroke={lines.color} strokeWidth="3"/>
                    <line key={i * 4 + 2} x1={lines.line3.x1} y1={lines.line3.y1} x2={lines.line3.x2}
                          y2={lines.line3.y2}
                          stroke={lines.color} strokeWidth="3"/>
                    <line key={i * 4 + 3} x1={lines.line4.x1} y1={lines.line4.y1} x2={lines.line4.x2}
                          y2={lines.line4.y2}
                          stroke={lines.color} strokeWidth="3"/>
                </React.Fragment>
            ))}
        </svg>
    );
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

export const squareSample: Lines[] = [{
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
]