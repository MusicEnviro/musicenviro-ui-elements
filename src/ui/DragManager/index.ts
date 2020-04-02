import { IPoint } from "@musicenviro/base"



export class DragManager {

    elements: HTMLElement[]

    clickPosition: IPoint

    addElement(element: HTMLElement) {
        console.log('DragManager.addElement()')
        
        this.elements.push(element)
        
        element.addEventListener('mousedown', (ev: MouseEvent) => {
            const rect = (ev.target as HTMLElement).getBoundingClientRect()
            this.clickPosition = {x: rect.left, y: rect.top}

            console.log(this.clickPosition)
        })
    }
}