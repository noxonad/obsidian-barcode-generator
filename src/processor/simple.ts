import { BarcodeProcessor } from "./barcode.interface";
import Barcode from "main";
import JsBarcode from "jsbarcode";

export class SimpleBarcodeProcessor implements BarcodeProcessor {
	barcode_app: Barcode;

	constructor(app: Barcode) {
		this.barcode_app = app;
	}

	public processBarcode(): void {
		this.barcode_app.registerMarkdownCodeBlockProcessor(this.barcode_app.settings.barcode_name, (content, el, _) => {
			const canvas = document.createElement('canvas');
			try { 		// Try to draw the barcode
				JsBarcode(canvas, content.trim(), Object.assign({}, this.barcode_app.settings, {format: this.barcode_app.settings.defaultFormat}));
				el.appendChild(canvas);
			} catch {	// Write just the barcode content
				el.appendChild(document.createTextNode(content));
			}
		});
	}
}