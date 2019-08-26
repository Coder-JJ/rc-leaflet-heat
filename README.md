# React HeatMap Component based on rc-leaflet

## History Versions

- [rc-leaflet-heat CHANGELOG](https://github.com/Coder-JJ/rc-leaflet-heat/blob/master/UPDATE.md)

## Docs

- [rc-leaflet](https://github.com/Coder-JJ/rc-leaflet)

- [heatmap.js](https://www.patrick-wied.at/static/heatmapjs/docs.html)

- [leaflet-heatmap](https://www.patrick-wied.at/static/heatmapjs/example-heatmap-leaflet.html)

## Features

- [x] `TypeScript` support

## Data Structure

- `Point`:

  ```ts
  interface Point {
    lat: number
    lng: number
    value?: number
  }
  ```

- `Gradient`:

  ```ts
  type Gradient = {
    [key: string]: string
  }
  ```

- `Extrema`:

  ```ts
  type Extrema = {
    gradient: Gradient
    max: number
    min: number
  }
  ```

## Usage

### Install

```cmd
npm install rc-leaflet-heat --save
```

### Example

```jsx
import React, { Component } from 'react'
import { RCMap, TileLayer } from 'rc-leaflet'
import HeatLayer from 'rc-leaflet-heat'

class App extends Component {
  state = {
    pointsWithValue: [
      { lat, lng, value }
    ],
    pointsWithoutValue: [
      { lat, lng }
    ]
  }

  render () {
    const values = this.state.pointsWithValue.map(({ value }) => value)
    const max = Math.max(...values)
    const half = max / 2

    return (
      <RCMap>
        <TileLayer />
        <HeatLayer points={this.state.pointsWithValue} dataMax={/* value between half and max */} />
        <HeatLayer points={this.state.pointsWithoutValue} dataMax={1.2} />
      </RCMap>
    )
  }
}
```

#### `Props`

- points

  - type: [Point](#Data-Structure)

  - required: `true`

  - points to render heatmap.

- dataMax

  - type: `number`

  - required: `false`

  - value to control the appearance of heatmap.

- dataMin

  - type: `number`

  - required: `false`

  - value to control the appearance of heatmap.

- backgroundColor

  - type: `string`

  - required: `false`

  - background color of heatmap layer.

- gradient

  - type: [Gradient](#Data-Structure)

  - required: `false`

  - color behavior of heatmap point.

- radius

  - type: `number`

  - required: `false`

  - default: `0.002`

  - radius of heatmap point.

- opacity

  - type: `number`

  - required: `false`

  - opacity of heatmap point, range from 0 to 1.

- maxOpacity

  - type: `number`

  - required: `false`

  - maxOpacity of heatmap point, range from 0 to 1.

- minOpacity

  - type: `number`

  - required: `false`

  - minOpacity of heatmap point, range from 0 to 1.

- blur

  - type: `number`

  - required: `false`

  - blur of heatmap point, range from 0 to 1.

- scaleRadius

  - type: `boolean`

  - required: `false`

  - default: `true`

  - automatic change radius of heatmap point when map is zoomed.

- useLocalExtrema

  - type: `boolean`

  - required: `false`

  - if set to true, dataMax and dataMin is set by script according to the current view of map.

- onExtremaChange

  - type: `(extrema: Extrema): void` [Extrema](#Data-Structure)

  - required: `false`

  - fired when extrema is probably changed.
