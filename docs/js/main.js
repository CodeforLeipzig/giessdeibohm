//var siteUrl = window.location.protocol + "//" + window.location.host + "/";
var siteUrl = "https://codeforleipzig.github.io/giessdeibohm/";
requirejs.config({
  baseUrl: siteUrl + "js/",
  paths: {
    "leaflet": "https://unpkg.com/leaflet@1.7.1/dist/leaflet",
    "leaflet.ajax": "https://cdnjs.cloudflare.com/ajax/libs/leaflet-ajax/2.1.0/leaflet.ajax.min",
    "jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min",
  }
});
require(["jquery", "map", "data", "shared_state", "info", "leaflet"], function (jquery, map, data, state, info, leaflet) {
  $.ajaxSetup({
    scriptCharset: "utf-8",
    contentType: "application/json; charset=utf-8"
  });

  const treeMap = map.create();
  const globalState = state.state();
  globalState.setTreeMap(treeMap);
  const infoBox = info.configureInfo(globalState);
  data.loadData(globalState, state.allDistricts[0]);
  infoBox.addTo(treeMap);


  const handleDistrictChange = (state) => {
    var selectionBox = document.getElementById("districtSelection");
    if (selectionBox && selectionBox.selectedIndex != -1) {
      var selectedDistrict = selectionBox.options[selectionBox.selectedIndex].text;
      state.setLastSelectedDistrict(selectedDistrict);
      if (selectedDistrict != "") {
        state.setLastCoordinates(undefined);
        state.setSelectedTree(undefined);
        state.setOldLayer(undefined);
        state.getTreeMap().removeLayer(globalState.getLastTreeLayer());
        state.getTreeMap().removeLayer(globalState.getLastDistrictLayer());
        data.loadData(state, selectedDistrict);
      }
    }
  }
  $("#districtSelection").on('change', function(e) {
    handleDistrictChange(globalState);
  });
});