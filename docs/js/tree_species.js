define(["jquery"], ($) => ({
  treeSpeciesSelectionBox: (state) => {
    var htmlCode = '<select id="treeSpeciesSelection">';
    for (var index in state.getTreeSpecieses()) {
      var treeSpecies = state.getTreeSpecieses()[index];
      if (treeSpecies) {
        htmlCode += '<option id="' + index + '">' + treeSpecies + '</option>';
      }
    }
    htmlCode += '</select>';
    return htmlCode;
  },

  selectedTreeSpecies: () => {
    var selectionBox = document.getElementById("treeSpeciesSelection");
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
  setTreeSpeciesInSelectionBox: (state) => {
    var selectionBox = document.getElementById('treeSpeciesSelection');
    if (selectionBox) {
      for (var option, index = 0; option = selectionBox.options[index]; index++) {
        if (option.attributes["id"].value == state.getLastSelectedTreeSpecies()) {
          selectionBox.selectedIndex = index;
          break;
        }
      }
    }
  },
  handleTreeSpeciesChange: (document, data, state) => {
    var treeSpeciesSelectionBox = document.getElementById("treeSpeciesSelection");
    var districtSelectionBox = document.getElementById("districtSelection");
    if (treeSpeciesSelectionBox && treeSpeciesSelectionBox.selectedIndex != -1 &&
      districtSelectionBox && districtSelectionBox.selectedIndex != -1) {
      var selectedTreeSpecies = treeSpeciesSelectionBox.options[treeSpeciesSelectionBox.selectedIndex].attributes["id"].value;
      var selectedDistrict = districtSelectionBox.options[districtSelectionBox.selectedIndex].attributes["id"].value;
      state.setLastSelectedTreeSpecies(selectedTreeSpecies);
      if (selectedTreeSpecies != "" && selectedDistrict != "") {
        state.setLastCoordinates(undefined);
        state.setSelectedTree(undefined);
        state.setOldLayer(undefined);
        state.getTreeMap().removeLayer(state.getLastTreeLayer());
        data.loadTreeData(state, selectedDistrict);
      }
    }
  }
}));