import L from 'leaflet';
import React, { Component } from 'react';
import { Map, TileLayer, LayersControl } from 'react-leaflet';
import VectorGridLayer from './../vector-grid/vector-grid.component';

export default class VtMap extends Component {
  constructor() {
    super();
    this.setVectorTileStyling();
  }

  componentDidMount() {
    const map = this.map.leafletElement;
    map.on('zoomend', () => {
      // window.console.log(map);
    });
  }

  setVectorTileStyling() {
    this.vectorTileStyling = {
      /* lakes: {
        fill: true,
        weight: 1,
        fillColor: '#06cccc',
        color: '#06cccc',
        fillOpacity: 1,
        opacity: 1,
      },
      rivers: {
        weight: 1,
        color: '#0000ff',
        fillOpacity: 1,
        opacity: 1,
      },
      regions: {
        fill: true,
        weight: 1,
        fillColor: '#53e033',
        color: '#53e033',
        fillOpacity: 1,
        opacity: 1,
      },
      islands: {
        fill: true,
        weight: 1,
        fillColor: '#53ffff',
        color: '#53e033',
        fillOpacity: 1,
        opacity: 1,
      },*/
      becej_parcels: {
        weight: 1,
        fill: '#53e033',
        color: '#00ff00',
        fillOpacity: 0.1,
        opacity: 1,
      },
      /* urban_areas: {
        weight: 1,
        fillColor: '#00ff00',
        color: '#c545d3',
        fillOpacity: 1,
        opacity: 1,
      },*/
    };
  }

  getFeatureId(f) {
    return f.properties.id;
  }

  render() {
    return (
      <Map
        center={[45.6430301, 19.9427805]}
        zoom={12}
        ref={(map) => {
          this.map = map;
        }}
      >

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="VectorTiles">
            <VectorGridLayer
              style={this.vectorTileStyling.becej_parcels}
              interactive="true"
              getFeatureId={this.getFeatureId}
              url="http://localhost:3001/rivers/{z}/{x}/{y}.mvt"
              attribution="<a href='https://openmaptiles.org/'>&copy; OpenMapTiles</a>, <a href='http://www.openstreetmap.org/copyright'>&copy; OpenStreetMap</a> contributors"
              vectorTileLayerStyles={this.vectorTileStyling}
              subdomains="0123"
              maxZoom="14"
              rendererFactory={L.canvas.tile}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    );
  }
}
