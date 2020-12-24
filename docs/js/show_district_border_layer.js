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
      var centroid = (data.name == "alle") ?
        [51.3406321, 12.3747329]
      : (() => {
        var coords = layer.feature.geometry.coordinates[0];
        return map.districtCenter(coords);
      })();
      var zoomLevel = 15;
      state.getTreeMap().setView(centroid, zoomLevel);
    });
  }
});