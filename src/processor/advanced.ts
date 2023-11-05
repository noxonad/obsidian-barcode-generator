import { BarcodeProcessor } from "./barcode.interface";
import { BarcodeSettings } from "settings";
import { BARCODE_TAG_NAME } from "./tags";
import JsBarcode from "jsbarcode";
import Barcode from "main";

export class AdvancedBarcodeProcessor implements BarcodeProcessor {
	barcode_app: Barcode;

	constructor(app: Barcode) {
		this.barcode_app = app;
	}

	public processBarcode(settings: BarcodeSettings, tag_name: string): void {
		this.barcode_app.registerMarkdownCodeBlockProcessor(tag_name, (content, el, _) => {
			const canvas = document.createElement('canvas');
			JsBarcode(canvas, content.trim(), {
				format: BARCODE_TAG_NAME[tag_name.split('-')[1]],
				width: settings.width,
				height: settings.height,
				displayValue: settings.displayValue,
				fontOptions: settings.fontOptions,
				font: settings.font,
				textAlign: settings.textAlign,
				textPosition: settings.textPosition,
				textMargin: settings.textMargin,
				fontSize: settings.fontSize,
				background: settings.background,
				lineColor: settings.lineColor,
				margin: settings.margin,
				marginTop: settings.marginTop,
				marginBottom: settings.marginBottom,
				marginLeft: settings.marginLeft,
				marginRight: settings.marginRight,
			});
			el.appendChild(canvas);
		});
	}
}