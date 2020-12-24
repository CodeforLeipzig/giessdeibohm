define(["jquery", "leaflet", "leaflet.ajax", "map", "location"], ($, leaflet, leafletAjax, map, location) => {
  return (state, geojsonData) => {
    const style = {
      weight: 2,
      color: 'blue',
      fillOpacity: 0.0
    }
    const geoJsonLayer = leaflet.geoJson(geojsonData, style);
    state.setLastDistrictLayer(geoJsonLayer);
    const treeMap = state.getTreeMap();
    treeMap.addLayer(geoJsonLayer);
    geoJsonLayer.eachLayer(function (layer) {
      var centroid = (geojsonData.name == "alle") ?
        [51.3406321, 12.3747329]
      : (() => {
        var coords = layer.feature.geometry.coordinates[0];
        return map.districtCenter(coords);
      })();
      location.setLocation(state, centroid);
    });
  }
});