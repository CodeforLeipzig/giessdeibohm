define(["jquery", "leaflet", "leaflet.ajax", "map", "icon", "info"], ($, leaflet, leafletAjax, map, icon, info) => {
  return (state, data) => {
    var geoJsonLayer = L.geoJson(data, { pointToLayer: map.createCircleMarker(state) });
    state.setLastTreeLayer(geoJsonLayer);
    state.getTreeMap().addLayer(geoJsonLayer);

    registerLayerMouseOver(state, icon, info, geoJsonLayer);
    registerLayerMouseOut(state, icon, info, geoJsonLayer);
    geoJsonLayer.on('click', registerLayerMouseClick(state, icon, info));
  }
});

function registerLayerMouseOver(state, icon, info, geoJsonLayer) {
  geoJsonLayer.on('mouseover', function (e) {
    if (!state.getLastCoordinates()) {
      state.setSelectedTree(e.layer.feature.properties["Standortnu"]);
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
