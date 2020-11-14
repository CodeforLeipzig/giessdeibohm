define(["jquery"], ($) => ({
  treeTypeSelectionBox: (state) => {
    var htmlCode = '<select id="treeTypeSelection">';
    for (var index in state.getTreeTypes()) {
      var treeType = state.getTreeTypes()[index];
      if (treeType) {
        htmlCode += '<option id="' + index + '">' + treeType + '</option>';
      }
    }
    htmlCode += '</select>';
    return htmlCode;
  },

  selectedTreeType: () => {
    var selectionBox = document.getElementById("treeTypeSelection");
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
  setTreeTypeInSelectionBox: (state) => {
    var selectionBox = document.getElementById('treeTypeSelection');
    if (selectionBox) {
      for (var option, index = 0; option = selectionBox.options[index]; index++) {
        if (option.attributes["id"].value == state.getLastSelectedTreeType()) {
          selectionBox.selectedIndex = index;
          break;
        }
      }
    }
  },
  handleTreeTypeChange: (document, data, state) => {
    var treeTypeSelectionBox = document.getElementById("treeTypeSelection");
    var districtSelectionBox = document.getElementById("districtSelection");
    if (treeTypeSelectionBox && treeTypeSelectionBox.selectedIndex != -1 &&
      districtSelectionBox && districtSelectionBox.selectedIndex != -1) {
      var selectedTreeType = treeTypeSelectionBox.options[treeTypeSelectionBox.selectedIndex].attributes["id"].value;
      var selectedDistrict = districtSelectionBox.options[districtSelectionBox.selectedIndex].attributes["id"].value;
      state.setLastSelectedTreeType(selectedTreeType);
      if (selectedTreeType != "" && selectedDistrict != "") {
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