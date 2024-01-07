# Changelog

## [1.1.0] - 2024-01-07

🎊 Added new `barcode-custom` block to customize each individual barcode!

The new block looks like:
````markdown
```barcode-custom
lineColor: #fff
height: 10
format: pharmacode
1341
```
````

The options matches the [JSBarcode settings](https://github.com/lindell/JsBarcode/wiki/Options). A list of the options can also be find below:

| Option       | Description                                                | Type               |
| ------------ | ---------------------------------------------------------- | ------------------ |
| format       | The format of the barcode. More can be found in the Readme | String             |
| width        | Width of the barcode                                       | Number             |
| height       | Height of the barcode in px                                | Number             |
| displayValue | "false" if you want to hide the text. "true" otherwise     | Boolean            |
| text         | Overrides the default text                                 | String             |
| font         | Sets the font for the text                                 | String             |
| textAlign    | Defaults to "center". Can be also "left" or "right"        | String             |
| textPosition | Defaults to "bottom". Can be also "top"                    | String             |
| textMargin   | Distance between the text and the barcode                  | Number             |
| fontSize     | Sets the text size                                         | Number             |
| background   | Color of the background                                    | String (CSS Color) |
| lineColor    | Color of the lines                                         | String (CSS Color) |
| margin       | Margin between the barcode and the edges                   | Number             |
| marginTop    | Margin between the barcode and the top edge                | Number             |
| marginBottom | Margin between the barcode and the bottom edge             | Number             |
| marginLeft   | Margin between the barcode and the left edge               | Number             |
| marginRight  | Margin between the barcode and the right edge              | Number             |
| flat         | An option for EAN8/EAN13 only. Flattens the barcode        | Boolean            |

## [1.0.2] - 2023-11-11

Update so it fits the [Obsidian plugin guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines).

## [1.0.1] - 2023-11-05

Metadata update.

## [1.0.0] - 2023-11-05

_🎉 First release._

[1.1.0]: https://github.com/noxonad/obsidian-barcode-generator/releases/tag/1.1.0
[1.0.2]: https://github.com/noxonad/obsidian-barcode-generator/releases/tag/1.0.2
[1.0.1]: https://github.com/noxonad/obsidian-barcode-generator/releases/tag/1.0.1
[1.0.0]: https://github.com/noxonad/obsidian-barcode-generator/releases/tag/1.0.0
