import _ from 'lodash'
import { IPoint, Pixels } from '@musicenviro/base'

export interface IPropOptions {
    padding?: Pixels,
    roundToPixel?: boolean,
}

const defaultOptions: Required<IPropOptions> = {
    padding: 0,
    roundToPixel: false
}

/**
 * convert proportional/relative point to absolute
 * @param ctx 
 * @param point coordinates are relative to canvas, so 0-1 is the width or height 
 */
export function propToAbs(ctx: CanvasRenderingContext2D, point: IPoint, options: IPropOptions = {}): IPoint {
    const { padding, roundToPixel } = {...defaultOptions, ...options}

    const _result = {
        x: padding + point.x * (ctx.canvas.width - padding * 2) ,
        y: padding + point.y * (ctx.canvas.height - padding * 2)
    }

    return roundToPixel ? _.mapValues(_result, n => Math.round(n) + 0.5)  : _result
    // nb. this is why we add 0.5: 
    // https://stackoverflow.com/questions/7530593/html5-canvas-and-line-width/7531540#7531540
}

/**
 * convert proportional/relative point to absolute
 * @param ctx 
 * @param point 
 * 
 * @returns point with coordinates that are relative to canvas, so 0-1 is the width or height 
 */
export function absToProp(ctx: CanvasRenderingContext2D, point: IPoint, options: IPropOptions = {}): IPoint {
    const padding = options.padding || 0
    return {
        x: (point.x - padding) / (ctx.canvas.width - padding * 2) ,
        y: (point.y - padding) / (ctx.canvas.height - padding * 2) 
    }
}