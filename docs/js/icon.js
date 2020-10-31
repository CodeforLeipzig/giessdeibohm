define({
  changeIcon: (state, e) => {
    const lastTreeLayer = state.getLastTreeLayer();
    var keys = Object.keys(lastTreeLayer._layers)
    keys.forEach(function (key) {
      var layerCoord = lastTreeLayer._layers[key]._latlng;
      var currentCoord = e.layer.feature.geometry.coordinates;
      state.setLastHoveredCoords(currentCoord);
      if (layerCoord.lat === currentCoord[1] &&
        layerCoord.lng === currentCoord[0]) {
        lastTreeLayer._layers[key].setStyle({
          fillColor: "#FEFF01"
        });
      }
    })
  },
  resetIcon: (state) => {
    const lastTreeLayer = state.getLastTreeLayer();
    var keys = Object.keys(lastTreeLayer._layers)
    keys.forEach(function (key) {
      var layerCoord = lastTreeLayer._layers[key]._latlng;
      var currentCoord = state.getLastHoveredCoords();
      if (currentCoord && layerCoord.lat === currentCoord[1] &&
        layerCoord.lng === currentCoord[0]) {
        lastTreeLayer._layers[key].setStyle({
          fillColor: "lightgreen"
        });
      }
    })
  }
});