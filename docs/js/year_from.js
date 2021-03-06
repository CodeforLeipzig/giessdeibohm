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
    var yearToSelectionBox = document.getElementById("yearToSelection");
    var yearFromSelectionBox = document.getElementById("yearFromSelection");
    var districtSelectionBox = document.getElementById("districtSelection");
    if (yearFromSelectionBox && yearFromSelectionBox.selectedIndex != -1 &&
      districtSelectionBox && districtSelectionBox.selectedIndex != -1) {
      var selectedYearFrom = yearFromSelectionBox.options[yearFromSelectionBox.selectedIndex].attributes["id"].value;
      var selectedDistrict = districtSelectionBox.options[districtSelectionBox.selectedIndex].attributes["id"].value;
      state.setLastSelectedYearFrom(selectedYearFrom);
      if (selectedYearFrom != "" && selectedDistrict != "") {
        if (yearToSelectionBox && yearToSelectionBox.selectedIndex != -1) {
          var selectedYearTo = yearToSelectionBox.options[yearToSelectionBox.selectedIndex].attributes["id"].value;
          if (selectedYearTo != "") {
            if (Number(selectedYearFrom) > Number(selectedYearTo)) {
              $('#yearToSelection option:contains(' + selectedYearFrom + ')').prop({selected: true});
              state.setLastSelectedYearTo(selectedYearFrom);
              state.setYearToExplicitySet(selectedYearFrom);
            }
          }
        }
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