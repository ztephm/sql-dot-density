const map = L.map('map').setView([41.4005362, 2.1523456], 12);
map.scrollWheelZoom.disable();

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

const client = new carto.Client({
  apiKey: 'nn6pGNyk_3tkMmCqIPAO-w',
  username: 'cdbsol-admin'
});

const source = new carto.source.SQL('SELECT g.* FROM gecat_geodata g tablesample system(20) ORDER BY ord DESC');

const style = new carto.style.CartoCSS(`
  @blg: #027091; 
  @org: #cc751f; 
  @red: #cc3333; 
  @blu: #0353e7; 
  @pur: #7400b7; 

  #layer {
    marker-width: .75;
    marker-fill: @pur;
    marker-fill-opacity: 1;
    marker-allow-overlap: true;
    marker-line-width: 0;
    marker-line-color: #FFF;
    marker-line-opacity: 1;

    [fullcarrier_clean = 'telefonica']{
      marker-fill: @blg;
      marker-fill-opacity: .1;
    }
    [fullcarrier_clean = 'orange']{
      marker-fill: @org;
      marker-fill-opacity: .8;
    }
    [fullcarrier_clean = 'vodafone']{
      marker-fill: @red;
      marker-fill-opacity: .8;
    }
    [fullcarrier_clean = 'yoigo']{
      marker-fill: @blu;
    }

    [zoom>=7] {
      marker-width: 1.0;
      [fullcarrier_clean = 'telefonica']{ marker-fill-opacity: .2; }
    }
    [zoom>=8]{ marker-width: 1.5; }
    [zoom>=11]{ marker-width: 2.0; }
    [zoom>=12]{ marker-width: 2.5; }
    [zoom>=13]{
      marker-width: 3.0;
      [fullcarrier_clean = 'telefonica']{ marker-fill-opacity: .6; }
    }
    [zoom>=14]{ marker-width: 3.5; }
    [zoom>=16]{ [fullcarrier_clean = 'telefonica']{ marker-fill-opacity: .8; } }
  }     
`);
const layer = new carto.layer.Layer(source, style);

client.addLayer(layer);
client.getLeafletLayer().addTo(map);