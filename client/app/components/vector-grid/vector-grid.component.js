import _ from 'lodash';
import L from 'leaflet';
import 'leaflet.vectorgrid/dist/Leaflet.VectorGrid.bundled';
import PropTypes from 'prop-types';
import { GridLayer } from 'react-leaflet';

export default class VectorGridLayer extends GridLayer {
  constructor() {
    super();
    this.styles = this.props;
    console.log(this.props);
  }

  onMouseover(e) {
    // console.log(this.props.style);
    // console.log(e.layer.properties);
    this.defaultOptions = _.cloneDeep(e.layer.options);
    const hoverStyle = _.cloneDeep(e.layer.options);
    hoverStyle.color = 'yellow';
    hoverStyle.fill = 'yellow';

    this.setFeatureStyle(e.layer.properties.id, hoverStyle);
  }

  onMouseout(e) {
    this.setFeatureStyle(e.layer.properties.id, this.defaultOptions);
  }

  componentDidMount() {
    super.componentDidMount();
    this.leafletElement.on('mouseover', this.onMouseover);
    this.leafletElement.on('mouseout', this.onMouseout);

    this.leafletElement.bindTooltip(
      layer => `<h5>ID ${layer.properties.id}</h5>`,
      {
        sticky: true,
      },
    );
  }

  createLeafletElement(props) {
    const { url, ...options } = props;
    options.key = props.serviceKey;
    return L.vectorGrid.protobuf(url, options);
  }

  updateLeafletElement(fromProps, toProps) {
    super.updateLeafletElement(fromProps, toProps);
    if (toProps.url !== fromProps.url) {
      this.leafletElement.vectorGrid.protobuf(toProps.url);
    }
  }
}

VectorGridLayer.propTypes = {
  opacity: PropTypes.number,
  url: PropTypes.string.isRequired,
  zIndex: PropTypes.number,
};
