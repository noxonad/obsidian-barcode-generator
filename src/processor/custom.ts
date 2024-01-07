import { BarcodeProcessor } from "./barcode.interface";
import Barcode from "main";
import JsBarcode from "jsbarcode";

export class CustomBarcodeProcessor implements BarcodeProcessor {
	barcode_app: Barcode;

	constructor(app: Barcode) {
		this.barcode_app = app;
	}

	public processBarcode(modifier: string = 'custom'): void {
		this.barcode_app.registerMarkdownCodeBlockProcessor(`${this.barcode_app.settings.barcode_name}-${modifier}`, (content, el, _) => {
			const csettings: {[key: string]: any} = Object.assign({}, this.barcode_app.settings, {format: this.barcode_app.settings.defaultFormat});
			const canvas = document.createElement('canvas');
			let display_content = ""; // Final display string to include in the barcode

			content.split('\n').forEach(row => {
				// Split each row and see if it matches `text: value`
				// If it does, take it as a settings parameter, otherwise include in the barcode text
				let r = row.split(':');
				r.forEach(el => el = el.trim());
				if (r.length > 1) {		// Change the according setings
					csettings[r[0]] = (isNaN(parseFloat(r[1])) ? r[1].trim() : Math.abs(parseFloat(r[1])));
				} else {				// the current line is not a setting so display it
					display_content += row + '\n';
				}
			});
			try {		// Try to draw the barcode
				JsBarcode(canvas, display_content.trim(), Object.assign({}, csettings));
				el.appendChild(canvas);
			} catch {	// Write just the barcode content
				el.appendChild(document.createTextNode(display_content));
			}
		});
	}
}