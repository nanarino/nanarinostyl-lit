import { type PropertyValues, html, css , LitElement} from "lit"
import { customElement, property, queryAssignedNodes } from "lit/decorators.js"
import mosaic from "@/assets/mosaic.svg?raw"

@customElement("na-svg-icon")
export class SvgIcon extends LitElement {
    @queryAssignedNodes()
    defaultSlotNodes!: Array<Node>
    @property({ type: String }) src: string = ""
    private async load() {
        if (this.src) {
            try {
                const res = await fetch(this.src)
                if (!res.ok) throw new Error(`${res.status}`)
                this.shadowRoot!.innerHTML = await res.text()
            } catch (error) {
                console.error(error)
                this.shadowRoot!.innerHTML = mosaic
            }
        }
    }
    protected updated(props: PropertyValues): void {
        if (props.has("src")) this.load()
    }
    protected render() {
        return html`<slot></slot>`
    }
    static styles = css`
        :host {
            display: inline-flex;
            width: 1em;
            height: 1em;
        }
        svg {
            width: 100%;
            height: 100%;
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        "na-svg-icon": SvgIcon
    }
}
