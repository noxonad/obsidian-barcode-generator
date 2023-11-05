import { BarcodeProcessor } from "./barcode.interface";
import { BarcodeSettings } from "settings";
import { MarkdownPreviewRenderer } from "obsidian";
import JsBarcode from "jsbarcode";
import Barcode from "main";

export class SimpleBarcodeProcessor implements BarcodeProcessor {
	barcode_app: Barcode;

	constructor(app: Barcode) {
		this.barcode_app = app;
	}

	public processBarcode(settings: BarcodeSettings, tag_name: string): void {
		MarkdownPreviewRenderer.unregisterPostProcessor(
			this.barcode_app.registerMarkdownCodeBlockProcessor(tag_name, (content, el, _) => {
				const canvas = document.createElement('canvas');
				JsBarcode(canvas, content.trim(), {
					format: settings.defaultFormat,
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
		}));
	}
}