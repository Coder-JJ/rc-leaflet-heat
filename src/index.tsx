import PropTypes from 'prop-types'
import L from 'leaflet'
import HeatmapOverlay from 'leaflet-heatmap'
import { ContextType } from 'rc-leaflet/es/components/RCMap/Context'
import { Layer } from 'rc-leaflet'

export interface Point {
  lat: number
  lng: number
  value?: number
}

export interface Gradient {
  [key: string]: string
}

export interface Extrema {
  gradient: Gradient
  max: number
  min: number
}

export interface PartialProps {
  dataMax: number
  dataMin: number
  backgroundColor: string
  gradient: Gradient
  radius: number
  opacity: number
  maxOpacity: number
  minOpacity: number
  blur: number
  scaleRadius: boolean
  useLocalExtrema: boolean
  onExtremaChange (extrema: Extrema): void
}

export interface ReqiuredProps {
  points: Point[]
}

export type Props = Readonly<L.LayerOptions & Partial<PartialProps> & ReqiuredProps>

const propTypes = {
  backgroundColor: PropTypes.string,
  gradient: PropTypes.object,
  radius: PropTypes.number,
  opacity: PropTypes.number,
  maxOpacity: PropTypes.number,
  minOpacity: PropTypes.number,
  blur: PropTypes.number,
  scaleRadius: PropTypes.bool,
  useLocalExtrema: PropTypes.bool,
  onExtremaChange: PropTypes.func
}

export default class HeatLayer extends Layer<HeatmapOverlay, Props> {
  public static propTypes = {
    ...Layer.propTypes,
    points: PropTypes.arrayOf(PropTypes.shape({ lat: PropTypes.number.isRequired, lng: PropTypes.number.isRequired, value: PropTypes.number })),
    dataMax: PropTypes.number,
    dataMin: PropTypes.number,
    ...propTypes
  }

  public static defaultProps = {
    radius: 0.002,
    scaleRadius: true
  }

  public constructor (props: Props, context: ContextType) {
    super(props, context)
    const { points: data, dataMax: max, dataMin: min } = props
    if (data && data.length) {
      this.instance.setData({ data, max, min })
    }
  }

  public componentDidUpdate (prevProps: Props): void {
    const { points: prevData, dataMax: prevMax, dataMin: prevMin, ...prevOptions } = prevProps
    const { points: data = [], dataMax: max, dataMin: min, ...options } = this.props

    let changed: boolean = false
    for (const key of Object.keys(propTypes)) {
      if (options[key] !== prevOptions[key]) {
        changed = true
        break
      }
    }
    if (changed) {
      this.instance._heatmap.configure({ valueField: 'value', ...options, xField: 'x', yField: 'y' })
    }
    if (data !== prevData || max !== prevMax || min !== prevMin) {
      this.instance.setData({ data, max, min })
    }
    super.componentDidUpdate(prevProps)
  }

  public createInstance (props: Props): HeatmapOverlay {
    const { points, dataMax, dataMin, ...options } = props
    return new HeatmapOverlay({ valueField: 'value', ...options })
  }
}
