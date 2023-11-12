# textlint-rule-period-in-header

textlint rule that check with or without period in header.

By default, no period mark at end of header.

```
[OK]

# header

[NG]

# header.
```

## Install

```
npm install textlint-rule-period-in-header
```

## Usage

```json
{
  "rules": {
    "period-in-header": true
  }
}
```

## Options

```jsonc
{
  // Prefer to use period mark. (default is no period)
  // You can select period mark from `periodMarks`.
  "periodMark": "",
  // Built-in recognized period mark list.
  "periodMarks": [".", "。", "．"]
}
```

## License

[MIT License](/LICENSE)
