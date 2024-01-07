import { BarcodeProcessor } from "./barcode.interface";
import { BARCODE_TAG_NAME } from "./tags";
import Barcode from "main";
import JsBarcode from "jsbarcode";

export class AdvancedBarcodeProcessor implements BarcodeProcessor {
	barcode_app: Barcode;

	constructor(app: Barcode) {
		this.barcode_app = app;
	}

	public processBarcode(modifier: string): void {
		this.barcode_app.registerMarkdownCodeBlockProcessor(`${this.barcode_app.settings.barcode_name}-${modifier}`, (content, el, _) => {
			const canvas = document.createElement('canvas');
			try {		// Try to draw the barcode
				JsBarcode(canvas, content.trim(), Object.assign({}, this.barcode_app.settings, { format: BARCODE_TAG_NAME[modifier] }));
				el.appendChild(canvas);
			} catch {	// Write just the barcode content
				el.appendChild(document.createTextNode(content));
			}
		});
	}
}