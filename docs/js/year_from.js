define(["jquery"], ($) => ({
  yearFromSelectionBox: (state) => {
    var htmlCode = '<select id="yearFromSelection">';
    for (var index in state.getYearFroms()) {
      var yearFrom = state.getYearFroms()[index];
      if (yearFrom) {
        htmlCode += '<option id="' + index + '">' + yearFrom + '</option>';
      }
    }
    htmlCode += '</select>';
    return htmlCode;
  },

  selectedYearFrom: () => {
    var selectionBox = document.getElementById("yearFromSelection");
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
  setYearFromInSelectionBox: (state) => {
    var selectionBox = document.getElementById('yearFromSelection');
    if (selectionBox) {
      for (var option, index = 0; option = selectionBox.options[index]; index++) {
        if (option.attributes["id"].value == state.getLastSelectedYearFrom()) {
          selectionBox.selectedIndex = index;
          break;
        }
      }
    }
  },
  handleYearFromChange: (document, data, state) => {
    var yearFromSelectionBox = document.getElementById("yearFromSelection");
    var districtSelectionBox = document.getElementById("districtSelection");
    if (yearFromSelectionBox && yearFromSelectionBox.selectedIndex != -1 &&
      districtSelectionBox && districtSelectionBox.selectedIndex != -1) {
      var selectedYearFrom = yearFromSelectionBox.options[yearFromSelectionBox.selectedIndex].attributes["id"].value;
      var selectedDistrict = districtSelectionBox.options[districtSelectionBox.selectedIndex].attributes["id"].value;
      state.setLastSelectedYearFrom(selectedYearFrom);
      if (selectedYearFrom != "" && selectedDistrict != "") {
        state.setLastCoordinates(undefined);
        state.setSelectedTree(undefined);
        state.setOldLayer(undefined);
        state.getTreeMap().removeLayer(state.getLastTreeLayer());
        data.loadTreeData(state, selectedDistrict);
      }
    }
  }
}));