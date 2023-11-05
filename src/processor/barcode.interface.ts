import { BarcodeSettings } from "settings";
import Barcode from "main";

export interface BarcodeProcessor {
	barcode_app: Barcode;

	processBarcode(settings: BarcodeSettings, tag_name: string): void;
}