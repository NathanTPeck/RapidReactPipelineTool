import { squares as squareSample } from "../../util/graphicLineGenerator.ts";
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
                <>
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
                </>
            ))}
        </svg>
    );
};