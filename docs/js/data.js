define(["jquery", "leaflet", "leaflet.ajax", "show_district_border_layer", "show_tree_layer"], function ($, leaflet, leafletAjax, showDistrictBorderLayer, showTreeLayer) {
  return {
    loadData: (state, district) => {
      $.getJSON(`geojsons/districts/${district}.geojson`, data => showDistrictBorderLayer(state, data));
      $.getJSON(`geojsons/trees/${district}.geojson`, data => showTreeLayer(state, data));
    }
  }
});