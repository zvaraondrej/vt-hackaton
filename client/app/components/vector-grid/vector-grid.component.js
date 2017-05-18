import L from 'leaflet';
import 'leaflet.vectorgrid/dist/Leaflet.VectorGrid.bundled';
import PropTypes from 'prop-types';
import { childrenType, GridLayer } from 'react-leaflet';

export default class VectorGridLayer extends GridLayer {
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
  children: childrenType,
  opacity: PropTypes.number,
  url: PropTypes.string.isRequired,
  zIndex: PropTypes.number,
};
