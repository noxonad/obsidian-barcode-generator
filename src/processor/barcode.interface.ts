import Barcode from "main";

export interface BarcodeProcessor {
	barcode_app: Barcode;

	processBarcode(modifier: string): void;
}