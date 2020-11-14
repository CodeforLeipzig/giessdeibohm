define(["jquery"], ($) => ({
  streetSelectionBox: (state) => {
    var htmlCode = '<select id="streetSelection">';
    for (var index in state.getStreets()) {
      var street = state.getStreets()[index];
      if (street) {
        htmlCode += '<option id="' + index + '">' + street + '</option>';
      }
    }
    htmlCode += '</select>';
    return htmlCode;
  },

  selectedStreet: () => {
    var selectionBox = document.getElementById("streetSelection");
    if (selectionBox && selectionBox.selectedIndex != -1) {
      var option = selectionBox.options[selectionBox.selectedIndex];
      if (option) {
        return option.attributes["id"].value;
      } else {
        ''
      }
    } else {
      ''
    }
  },
  setStreetInSelectionBox: (state) => {
    var selectionBox = document.getElementById('streetSelection');
    if (selectionBox) {
      for (var option, index = 0; option = selectionBox.options[index]; index++) {
        if (option.attributes["id"].value == state.getLastSelectedStreet()) {
          selectionBox.selectedIndex = index;
          break;
        }
      }
    }
  },
  handleStreetChange: (document, data, state) => {
    var streetSelectionBox = document.getElementById("streetSelection");
    var districtSelectionBox = document.getElementById("districtSelection");
    if (streetSelectionBox && streetSelectionBox.selectedIndex != -1 &&
      districtSelectionBox && districtSelectionBox.selectedIndex != -1) {
      var selectedStreet = streetSelectionBox.options[streetSelectionBox.selectedIndex].attributes["id"].value;
      var selectedDistrict = districtSelectionBox.options[districtSelectionBox.selectedIndex].attributes["id"].value;
      state.setLastSelectedStreet(selectedStreet);
      if (selectedStreet != "" && selectedDistrict != "") {
        state.setLastCoordinates(undefined);
        state.setSelectedTree(undefined);
        state.setOldLayer(undefined);
        state.getLastTreeLayer().clearLayers()
        state.getTreeMap().removeLayer(state.getLastClusterLayer());
        data.loadTreeData(state, selectedDistrict);
      }
    }
  }
}));