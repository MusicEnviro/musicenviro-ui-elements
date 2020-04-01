import { IPoint, Pixels } from '@musicenviro/base'

export interface IPropOptions {
    absolutePadding?: Pixels
}

/**
 * convert proportional/relative point to absolute
 * @param ctx 
 * @param point coordinates are relative to canvas, so 0-1 is the width or height 
 */
export function propToAbs(ctx: CanvasRenderingContext2D, point: IPoint, options: IPropOptions = {}): IPoint {
    const padding = options.absolutePadding || 0
    return {
        x: padding + point.x * (ctx.canvas.width - padding * 2) ,
        y: padding + point.y * (ctx.canvas.height - padding * 2)
    }
}

/**
 * convert proportional/relative point to absolute
 * @param ctx 
 * @param point 
 * 
 * @returns point with coordinates that are relative to canvas, so 0-1 is the width or height 
 */
export function absToProp(ctx: CanvasRenderingContext2D, point: IPoint): IPoint {
    return {
        x: point.x / ctx.canvas.width,
        y: point.y / ctx.canvas.height
    }
}