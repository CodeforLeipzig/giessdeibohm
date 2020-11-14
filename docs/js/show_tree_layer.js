define(["jquery", "leaflet", "leaflet.ajax", "leaflet.markercluster", "progress", "map", "icon", "info"], ($, leaflet, leafletAjax, leafletClusterMap, updateProgressBar, map, icon, info) => {
  return (state, data) => {
    state.setMatchCount(0);
    var clusterLayer = leaflet.markerClusterGroup({ chunkedLoading: true, chunkProgress: updateProgressBar, maxClusterRadius: () => 25 });
    state.setLastClusterLayer(clusterLayer);
    var geoJsonLayer = leaflet.geoJson(data, { pointToLayer: map.createCircleMarker(state) });
    state.setLastTreeLayer(geoJsonLayer);
    clusterLayer.addLayer(geoJsonLayer);
    state.getTreeMap().addLayer(clusterLayer);
    registerLayerMouseOver(state, icon, info, geoJsonLayer);
    registerLayerMouseOut(state, icon, info, geoJsonLayer);
    geoJsonLayer.on('click', registerLayerMouseClick(state, icon, info));
    state.getInfo().update();
  }
});

function registerLayerMouseOver(state, icon, info, geoJsonLayer) {
  geoJsonLayer.on('mouseover', function (e) {
    if (!state.getLastCoordinates()) {
      state.setSelectedTree(e.layer.feature.properties["standortnr"]);
      icon.changeIcon(state, e);
      info.highlightFeature(state, e);
    }
  });
};

function registerLayerMouseOut(state, icon, info, geoJsonLayer) {
  geoJsonLayer.on('mouseout', function (e) {
    if (!state.getLastCoordinates()) {
      info.resetHighlight(state, e);
      icon.resetIcon(state);
    }
  });
};

function registerLayerMouseClick(state, icon, info) {
  return (e) => {
    var coordinates = e.layer.feature.geometry.coordinates;
    var layer = e.layer;
    if (state.getLastCoordinates() != coordinates) {
      if (state.getLastCoordinates()) {
        icon.resetIcon(state);
        icon.changeIcon(state, e);
      }
      info.highlightFeature(state, e);
      state.setLastCoordinates(coordinates);
    } else {
      icon.resetIcon(state);
      state.setLastCoordinates(undefined);
      state.setSelectedTree(undefined);
    }
    state.setOldLayer(layer);
  }
}
