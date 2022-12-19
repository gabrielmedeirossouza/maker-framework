import { View } from "..";
import type { TTemplate } from '..';

export class Render {
    private _anchor: HTMLElement;

    private _view: View;

    constructor(view: View, anchor: string) {
        const attemptGetAnchor = document.querySelector(anchor) as HTMLElement | undefined;

        if (!attemptGetAnchor) throw new Error(`${Render.name}: Anchor provided ${anchor} not found in DOM.`);

        this._anchor = attemptGetAnchor;
        this._view = view;
    }

    public Make(callbackTemplate?: TTemplate): void {
        if (callbackTemplate) {
            this._view.CurrentTemplate = callbackTemplate;
        }

        this._anchor.innerHTML = "";

        Array.from(this._view.CurrentTemplate().children).forEach(element => {
            this._anchor.append(element);
        });
    }
}
