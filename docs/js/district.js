const districtDict = {
  "altlindenau": "Altlindenau",
  "lindenau": "Lindenau",
  "neulindenau": "Neulindenau",
  "plagwitz": "Plagwitz",
  "schleussig": "Schleußig"
};
const districts = Object.keys(districtDict);

define(["jquery"], ($) => ({
  allDistricts: districts,
  districtSelectionBox: (state) => {
    var htmlCode = '<select id="districtSelection">';
    for (var index in districts) {
      var district = districts[index];
      if (district) {
        htmlCode += '<option id="' + district + '">' + districtDict[district] + '</option>';
      }
    }
    htmlCode += '</select>';
    return htmlCode;
  },

  selectedDistrict: () => {
    var selectionBox = document.getElementById("districtSelection");
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
  setDistrictInSelectionBox: (state) => {
    var selectionBox = document.getElementById('districtSelection');
    if (selectionBox) {
      for (var option, index = 0; option = selectionBox.options[index]; index++) {
        if (option.attributes["id"].value == state.getLastSelectedDistrict()) {
          selectionBox.selectedIndex = index;
          break;
        }
      }
    }
  },
  handleDistrictChange: (document, data, state) => {
    var selectionBox = document.getElementById("districtSelection");
    if (selectionBox && selectionBox.selectedIndex != -1) {
      var selectedDistrict = selectionBox.options[selectionBox.selectedIndex].attributes["id"].value;
      state.setLastSelectedDistrict(selectedDistrict);
      if (selectedDistrict != "") {
        state.setLastCoordinates(undefined);
        state.setSelectedTree(undefined);
        state.setOldLayer(undefined);
        state.getTreeMap().removeLayer(state.getLastTreeLayer());
        state.getTreeMap().removeLayer(state.getLastDistrictLayer());
        state.resetStreets();
        state.resetTreeTypes();
        state.setStreetExplicitySet(false);
        state.setTreeTypeExplicitySet(false);
        state.setLastSelectedStreet(0);
        state.setLastSelectedTreeType(0);
        data.loadData(state, selectedDistrict);
        $('#streetSelection option:eq(0)').prop('selected', true);
        $('#treeTypeSelection option:eq(0)').prop('selected', true);
      }
    }
  }
}));