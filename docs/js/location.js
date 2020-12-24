define(["jquery", "leaflet", "leaflet.ajax", "district"], ($, leaflet, leafletAjax, district) => {
  return {
    fillTreeLocations: (state) => {
      if (!state.hasTreeLocs()) {
        return $.getJSON(`geojsons/trees/alle.geojson`, geojsonData => {
          geojsonData.features.forEach(feature => {
          const id = feature.properties["standortnr"];
            state.setTreeLoc({
              id,
              district: feature.properties["ortsteil"],
              x: feature.properties["xcoord"],
              y: feature.properties["ycoord"]
            });
          });
        });
      } else {
        return Promise.resolve();
      }
    },
    setNearestDistrict: (state, data) => {
      const latLng = state.getCurrentPosition();
      if (latLng) {
        const tree = state.getNearestTreeLoc(latLng)
        if (tree) {
          $('select[id="districtSelection"]').find('option:contains("' + tree.district + '")').attr("selected", true).parent().change();
        }
      }
    },
    setLocation: (state, centroid) => {
      const position = state.getCurrentPosition() || centroid;
      state.getTreeMap().setView(position, state.getZoomLevel())
      if (state.getCurrentPosition()) {
        L.marker(position).addTo(state.getTreeMap());
      }
    }
  }
});