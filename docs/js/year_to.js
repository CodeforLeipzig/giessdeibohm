define(["jquery"], ($) => ({
  yearToSelectionBox: (state) => {
    var htmlCode = '<select id="yearToSelection">';
    for (var index in state.getYearTos()) {
      var yearTo = state.getYearTos()[index];
      if (yearTo) {
        htmlCode += '<option id="' + index + '">' + yearTo + '</option>';
      }
    }
    htmlCode += '</select>';
    return htmlCode;
  },

  selectedYearTo: () => {
    var selectionBox = document.getElementById("yearToSelection");
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
  setYearToInSelectionBox: (state) => {
    var selectionBox = document.getElementById('yearToSelection');
    if (selectionBox) {
      for (var option, index = 0; option = selectionBox.options[index]; index++) {
        if (option.attributes["id"].value == state.getLastSelectedYearTo()) {
          selectionBox.selectedIndex = index;
          break;
        }
      }
    }
  },
  handleYearToChange: (document, data, state) => {
    var yearFromSelectionBox = document.getElementById("yearFromSelection");
    var yearToSelectionBox = document.getElementById("yearToSelection");
    var districtSelectionBox = document.getElementById("districtSelection");
    if (yearToSelectionBox && yearToSelectionBox.selectedIndex != -1 &&
      districtSelectionBox && districtSelectionBox.selectedIndex != -1) {
      var selectedYearTo = yearToSelectionBox.options[yearToSelectionBox.selectedIndex].attributes["id"].value;
      var selectedDistrict = districtSelectionBox.options[districtSelectionBox.selectedIndex].attributes["id"].value;
      state.setLastSelectedYearTo(selectedYearTo);
      if (selectedYearTo != "" && selectedDistrict != "") {
        if (yearFromSelectionBox && yearFromSelectionBox.selectedIndex != -1) {
          var selectedYearFrom = yearFromSelectionBox.options[yearFromSelectionBox.selectedIndex].attributes["id"].value;
          if (selectedYearFrom != "") {
            if (Number(selectedYearFrom) > Number(selectedYearTo)) {
              $('#yearFromSelection option:contains(' + selectedYearTo + ')').prop({selected: true});
              state.setLastSelectedYearFrom(selectedYearTo);
              state.setYearFromExplicitySet(selectedYearTo);
            }
          }
        }
        state.setLastCoordinates(undefined);
        state.setSelectedTree(undefined);
        state.setOldLayer(undefined);
        state.getTreeMap().removeLayer(state.getLastTreeLayer());
        data.loadTreeData(state, selectedDistrict);
      }
    }
  }
}));