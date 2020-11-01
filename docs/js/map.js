define(["jquery", "leaflet", "leaflet.ajax"], ($, leaflet, leafletAjax) => ({
	create: () => {
    var treeMap = leaflet.map('TreeMap');
    var baseMap = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    baseMap.addTo(treeMap);
    return treeMap;
  },
  createCircleMarker: (state) => (feature, latlng) => {
    const selectedTree = state.getSelectedTree();
    const selectedStreet = state.getLastSelectedStreet();
    const street = feature.properties["Strasse_Na"];
    state.addStreet(street);
    const selectedTreeType = state.getLastSelectedTreeType();
    const treeType = feature.properties["Baumart_de"];
    state.addTreeType(treeType);
    const selectedYearFrom = state.getLastSelectedYearFrom();
    const yearFrom = feature.properties["Pflanzjahr"];
    state.addYearFrom(yearFrom);
    const selectedYearTo = state.getLastSelectedYearTo();
    const yearTo = feature.properties["Pflanzjahr"];
    state.addYearTo(yearTo);
    var options = {
      radius: 8,
      fillColor: selectedTree && selectedTree === feature.properties["Standortnu"] ? "red" : "lightgreen",
      color: "black",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }
    const matchesStreet = !selectedStreet || selectedStreet == 0 || state.getStreets()[selectedStreet] == street;
    const matchesTreeType = !selectedTreeType || selectedTreeType == 0 || state.getTreeTypes()[selectedTreeType] == treeType;
    const matchesYearFrom = !selectedYearFrom || selectedYearFrom == 0 || parseInt(state.getYearFroms()[selectedYearFrom]) <= parseInt(yearFrom);
    const matchesYearTo = !selectedYearTo || selectedYearTo == 0 || parseInt(state.getYearTos()[selectedYearTo]) >= parseInt(yearTo);
    const showMarker = matchesStreet && matchesTreeType && matchesYearFrom && matchesYearTo;
    if (showMarker) {
      return L.circleMarker(latlng, options);
    }
  },
  districtCenter: (arr) => {
    var arrToUse;
    if (arr.length == 1) {
      arrToUse = arr[0];
    } else {
      arrToUse = arr;
    }
    var center = arrToUse.reduce(function (x, y) {
      return [x[0] + y[0] / arrToUse.length, x[1] + y[1] / arrToUse.length]
    }, [0, 0])
    return [center[1], center[0]];
  }
}));