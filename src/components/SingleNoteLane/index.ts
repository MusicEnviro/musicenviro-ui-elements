import { LazyCanvasRedrawer, lazyCanvasRedrawerDefaultProps } from "../LazyCanvasRedrawer";
import { drawLineP } from "../../graphics/canvas-drawing/drawLine";
import { drawCircleP } from "../../graphics/canvas-drawing/drawCircle";
import { IRhythmTree, getRhythmPoints, tree44 } from './trees'


const radii = [0.08, 0.06, 0.04]

export class SingleNoteLane extends LazyCanvasRedrawer {
    
    tree: IRhythmTree = tree44
    
    static defaultProps = {
        style: {...lazyCanvasRedrawerDefaultProps.style, 
            border: 'solid black 1px'
        },
        width: 750,
        height: 100
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawLineP(ctx, { absolutePadding: 10 }, {x: 0, y: 0.5}, {x: 1, y: 0.5})
    
        getRhythmPoints(this.tree).forEach(point => {  
            drawCircleP(ctx, { absolutePadding: 10 }, {x: point.position, y: 0.5}, radii[point.depth])
        })
    }
}