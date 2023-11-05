import { Plugin } from 'obsidian';
import { BarcodeSettingsTab, BarcodeSettings, DEFAULT_SETTINGS } from "settings"
import { BARCODE_TAG_NAME } from 'processor/tags';
import { SimpleBarcodeProcessor } from 'processor/simple';
import { AdvancedBarcodeProcessor } from 'processor/advanced';

export default class Barcode extends Plugin {
	settings: BarcodeSettings;

	async attachBarcodeProcessors() {
		// Attach simple barcode blocks
		new SimpleBarcodeProcessor(this).processBarcode(this.settings, this.settings.barcode_name);

		// Attach barcode-* blocks
		for (const [code, _] of Object.entries(BARCODE_TAG_NAME)) {
			new AdvancedBarcodeProcessor(this).processBarcode(this.settings, `${this.settings.barcode_name}-${code.toLowerCase()}`);
		}
	}

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new BarcodeSettingsTab(this.app, this));

		this.attachBarcodeProcessors();
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}