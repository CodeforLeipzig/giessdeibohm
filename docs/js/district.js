define(["jquery", "shared_state"], ($, sharedState) => ({
  districtSelectionBox: (state) => {
    var htmlCode = '<select id="districtSelection">';
    for (var index in sharedState.allDistricts) {
      var district = sharedState.allDistricts[index];
      if (district) {
        htmlCode += '<option>' + district + '</option>';
      }
    }
    htmlCode += '</select>';
    state.setOldHtmlCode(htmlCode);
    return htmlCode;
  },

  selectedDistrict: () => {
    var selectionBox = document.getElementById("districtSelection");
    if (selectionBox && selectionBox.selectedIndex != -1) {
      var option = selectionBox.options[selectionBox.selectedIndex];
      if (option) {
        return option.text;
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
        if (option.value == state.getLastSelectedDistrict()) {
          selectionBox.selectedIndex = index;
          break;
        }
      }
    }
  }
}));