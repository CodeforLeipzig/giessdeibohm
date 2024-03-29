var siteUrl = window.location.protocol == "file:" ? "file://D:/git/giessdeibohm/docs/" : "https://codeforleipzig.github.io/giessdeibohm/";
requirejs.config({
  baseUrl: siteUrl + "js/",
  paths: {
    "leaflet": "https://unpkg.com/leaflet@1.7.1/dist/leaflet",
    "leaflet.ajax": "https://cdnjs.cloudflare.com/ajax/libs/leaflet-ajax/2.1.0/leaflet.ajax.min",
    "leaflet.markercluster": "https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster",
    "jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min",
  }
});

require(["jquery", "map", "data", "shared_state", "info", "district", "leaflet", "leaflet.ajax"], function ($, map, data, state, info, district, leaflet, leafletAjax) {
  $.ajaxSetup({
    scriptCharset: "utf-8",
    contentType: "application/json; charset=utf-8"
  });
  const getQueryStringValue = (uri, key) => {
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var matches = uri.match(regex);
    return matches == null ? null : matches[1];
  };

  const treeMap = map.create();
  const globalState = state.state();
  globalState.setTreeId(getQueryStringValue(window.location.href, 'treeId'));
  globalState.setTreeMap(treeMap);
  const infoBox = info.configureInfo(globalState, data);
  data.loadData(globalState, globalState.getTreeId() ? "alle" : district.allDistricts[0]);
  infoBox.addTo(treeMap);
});
