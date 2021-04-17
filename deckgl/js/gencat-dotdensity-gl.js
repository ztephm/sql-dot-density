deck.carto.setDefaultCredentials({
  username: "cdbsol-admin",
  apiKey: 'UQlY6V12zUzgabxvaJAobA',
});

const CARRIER_COLORS = {
  RED: [204, 51, 51],
  ORG: [204, 117, 31],
  BLG: [2, 112, 145],
  BLU: [3, 83, 231],
  PRP: [116, 0, 183],
};

const initZoom = 12;
let currentZoom = initZoom;

const MobileCarriersLayer = (zm) => {
  console.log("zm = " + zm);
  return new deck.carto.CartoSQLLayer({
    id: "mobile_carriers",
    data: `SELECT cartodb_id, the_geom_webmercator, net_type, speed, fullcarrier_clean, ord FROM gecat_geodata_sample ORDER BY ord DESC`,
    lineWidthMinPixels: 0.2,
    getFillColor: (object) => {
      if (object.properties.fullcarrier_clean == 'orange') {
        return CARRIER_COLORS.ORG;
      } else if (object.properties.fullcarrier_clean == 'telefonica') {
        return CARRIER_COLORS.BLG;
      } else if (object.properties.fullcarrier_clean == 'vodafone') {
        return CARRIER_COLORS.RED;
      } else if (object.properties.fullcarrier_clean == 'yoigo') {
        return CARRIER_COLORS.BLU;
      } else {
        return CARRIER_COLORS.RED;
      }
    },
    getRadius: () => {
      return (1000000 / Math.pow(zm, 5)) * 2;
    },
    pickable: false,
  })
}

const deckgl = new deck.DeckGL({
  container: "map",
  mapStyle: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  initialViewState: {
    latitude: 41.39464, 
    longitude: 2.1523456,
    zoom: initZoom,
  },
  controller: true,
  onViewStateChange: ({viewState}) => {
    let vsZoom = viewState.zoom;

    if (currentZoom !== vsZoom) {
      deckgl.setProps({layers: [ MobileCarriersLayer(vsZoom) ]});
      currentZoom = vsZoom;
    }
  },
  layers: [ MobileCarriersLayer(currentZoom) ],
});