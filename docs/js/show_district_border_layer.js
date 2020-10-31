define(["jquery", "leaflet", "leaflet.ajax", "map"], ($, leaflet, leafletAjax, map) => {
  return (state, data) => {
    const style = {
      weight: 2,
      color: 'blue',
      fillOpacity: 0.0
    }
    const geoJsonLayer = leaflet.geoJson(data, style);
    state.setLastDistrictLayer(geoJsonLayer);
    const treeMap = state.getTreeMap();
    treeMap.addLayer(geoJsonLayer);
    geoJsonLayer.eachLayer(function (layer) {
      var coords = layer.feature.geometry.coordinates[0];
      var centroid = map.districtCenter(coords);
      var zoomLevel = 15;
      state.getTreeMap().setView(centroid, zoomLevel);
    });
  }
});