import { App, PluginSettingTab, Setting } from "obsidian";
import Barcode from "main";
import { BARCODE_SETTINGS_NAME } from "processor/tags";

export interface BarcodeSettings {
	barcode_name: string;
	defaultFormat: string;
	width: number;
	height: number;
	displayValue: boolean;
	fontOptions: string;
	font: string;
	textAlign: string;
	textPosition: string;
	textMargin: number;
	fontSize: number;
	background: string;
	lineColor: string;
	margin: number;
	marginTop: number;
	marginBottom: number;
	marginLeft: number;
	marginRight: number;
}

export const DEFAULT_SETTINGS: BarcodeSettings = {
	barcode_name: "barcode",
	defaultFormat: "CODE128",
	width: 2,
	height: 100,
	displayValue: true,
	fontOptions: "",
	font: "monospace",
	textAlign: "center",
	textPosition: "bottom",
	textMargin: 2,
	fontSize: 20,
	background: "#fff",
	lineColor: "#000",
	margin: 10,
	marginTop: 0,
	marginBottom: 0,
	marginLeft: 0,
	marginRight: 0
}


export class BarcodeSettingsTab extends PluginSettingTab {
	plugin: Barcode;

	constructor(app: App, plugin: Barcode) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private set_barcode_name(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Barcode name tag')
		.setDesc('Codeblock tag that will be used to determine if the code block is meant to be a barcode.')
		.addText(text => text
			.setPlaceholder('barcode')
			.setValue(this.plugin.settings.barcode_name)
			.onChange(async (value) => {
				this.plugin.settings.barcode_name = value;
				await this.plugin.saveSettings();
		}));
	}

	private set_format(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Default format')
		.setDesc('Select the default barcode format (it will not affect pre-formatted or custom barcodes).')
		.addDropdown(compenent => compenent 
			.addOptions(BARCODE_SETTINGS_NAME)
			.setValue(this.plugin.settings.defaultFormat)
			.onChange(async (value) => {
				this.plugin.settings.defaultFormat = value;
				await this.plugin.saveSettings();
		}));
	}

	private set_background(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Background color')
		.addColorPicker(color => color
			.setValue(this.plugin.settings.background)
			.onChange(async (value) => {
				this.plugin.settings.background = value;
				await this.plugin.saveSettings();
		}));
	}

	private set_line(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Line color')
		.addColorPicker(color => color
			.setValue(this.plugin.settings.lineColor)
			.onChange(async (value) => {
				this.plugin.settings.lineColor = value;
				await this.plugin.saveSettings();
		}));
	}

	private set_text_display(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Display text')
		.addToggle(component => component
			.setValue(this.plugin.settings.displayValue)
			.onChange(async (value) => {
				this.plugin.settings.displayValue = value;
				await this.plugin.saveSettings();
		}));
	}

	private set_font(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Font style')
		.addText(text => text
			.setPlaceholder('monospace')
			.setValue(this.plugin.settings.font)
			.onChange(async (value) => {
				this.plugin.settings.font = value;
				await this.plugin.saveSettings();
		}));
	}

	private set_font_size(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Font size')
		.setDesc('Size of the font in pixels.')
		.addText(text => text
			.setPlaceholder('font size')
			.setValue(""+this.plugin.settings.fontSize)
			.onChange(async (value) => {
				this.plugin.settings.fontSize = +value;
				await this.plugin.saveSettings();
		}));
	}

	private set_text_align(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Text align')
		.setDesc('Horizontal position of the text in the barcode.')
		.addDropdown(compenent => compenent
			.addOption("left", "Left")
			.addOption("center", "Center")
			.addOption("right", "Right")
			.setValue(this.plugin.settings.textAlign)
			.onChange(async (value) => {
				this.plugin.settings.textAlign = value;
				await this.plugin.saveSettings();
		}));
	}

	private set_text_position(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Text position')
		.setDesc('Vertical position of the text in the barcode.')
		.addDropdown(compenent => compenent
			.addOption("top", "Top")
			.addOption("bottom", "Bottom")
			.setValue(this.plugin.settings.textPosition)
			.onChange(async (value) => {
				this.plugin.settings.textPosition = value;
				await this.plugin.saveSettings();
		}));
	}

	private set_width(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Barcode width')
		.addSlider(componenet => componenet
			.setLimits(1, 5, 1)
			.setValue(this.plugin.settings.width)
			.onChange(async (value) => {
				this.plugin.settings.width = value;
				await this.plugin.saveSettings();
		}));
	}

	private set_height(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Barcode height')
		.addSlider(componenet => componenet
			.setLimits(25, 500, 1)
			.setValue(this.plugin.settings.height)
			.onChange(async (value) => {
				this.plugin.settings.height = value;
				await this.plugin.saveSettings();
		}));
	}

	private set_margin(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Margin')
		.addSlider(componenet => componenet
			.setLimits(1, 20, 1)
			.setValue(this.plugin.settings.margin)
			.onChange(async (value) => {
				this.plugin.settings.margin = value;
				await this.plugin.saveSettings();
		}));
	}

	private set_text_margin(containerEl: HTMLElement) {
		new Setting(containerEl)
		.setName('Text margin')
		.addSlider(componenet => componenet
			.setLimits(1, 20, 1)
			.setValue(this.plugin.settings.textMargin)
			.onChange(async (value) => {
				this.plugin.settings.textMargin = value;
				await this.plugin.saveSettings();
		}));
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		// Function not working properly as you can't unregister
		// the markdown codeblock processor
		// Thus the default codeblock name will be static and match "barcode"
		// this.set_barcode_name(containerEl);
		
		this.set_format(containerEl);
		this.set_background(containerEl);
		this.set_line(containerEl);
		
		containerEl.createEl("h1", { text: "Text and font" });

		this.set_text_display(containerEl);
		this.set_font(containerEl);
		this.set_font_size(containerEl);
		this.set_text_align(containerEl);
		this.set_text_position(containerEl);

		containerEl.createEl("h1", { text: "Size and margins" });

		this.set_width(containerEl);
		this.set_height(containerEl);
		this.set_margin(containerEl);
		this.set_text_margin(containerEl);
	}
}
