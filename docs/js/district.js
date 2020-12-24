const districtDict = {
  "althen-kleinpoesna": "Althen-Kleinpösna",
  "altlindenau": "Altlindenau",
  "anger-crottendorf": "Anger-Crottendorf",
  "baalsdorf": "Baalsdorf",
  "burghausen-rueckmarsdorf": "Burghausen-Rückmarsdorf",
  "boehlitz-ehrenberg": "Böhlitz-Ehrenberg",
  "connewitz": "Connewitz",
  "doelitz-doesen": "Dölitz-Dösen",
  "engelsdorf": "Engelsdorf",
  "eutritzsch": "Eutritzsch",
  "gohlis-mitte": "Gohlis-Mitte",
  "gohlis-nord": "Gohlis-Nord",
  "gohlis-sued": "Gohlis-Süd",
  "grosszschocher": "Großzschocher",
  "gruenau-mitte": "Grünau-Mitte",
  "gruenau-nord": "Grünau-Nord",
  "gruenau-ost": "Grünau-Ost",
  "gruenau-siedlung": "Grünau-Siedlung",
  "hartmannsdorf-knautnaundorf": "Hartmannsdorf-Knautnaundorf",
  "heiterblick": "Heiterblick",
  "holzhausen": "Holzhausen",
  "kleinzschocher": "Kleinzschocher",
  "knautkleeberg-knauthain": "Knautkleeberg-Knauthain",
  "lausen-gruenau": "Lausen-Grünau",
  "leutzsch": "Leutzsch",
  "liebertwolkwitz": "Liebertwolkwitz",
  "lindenau": "Lindenau",
  "lindenthal": "Lindenthal",
  "loessnig": "Lößnig",
  "luetzschena-stahmeln": "Lützschena-Stahmeln",
  "marienbrunn": "Marienbrunn",
  "meusdorf": "Meusdorf",
  "miltitz": "Miltitz",
  "mockau-nord": "Mockau-Nord",
  "mockau-sued": "Mockau-Süd",
  "moeckern": "Möckern",
  "moelkau": "Mölkau",
  "neulindenau": "Neulindenau",
  "neustadt-neuschoenefeld": "Neustadt-Neuschönefeld",
  "paunsdorf": "Paunsdorf",
  "plagwitz": "Plagwitz",
  "plaussig-portitz": "Plaußig-Portitz",
  "probstheida": "Probstheida",
  "reudnitz-thonberg": "Reudnitz-Thonberg",
  "schleussig": "Schleußig",
  "schoenau": "Schönau",
  "schoenefeld-abtnaundorf": "Schönefeld-Abtnaundorf",
  "schoenefeld-ost": "Schönefeld-Ost",
  "seehausen": "Seehausen",
  "sellerhausen-stuenz": "Sellerhausen-Stünz",
  "stoetteritz": "Stötteritz",
  "suedvorstadt": "Südvorstadt",
  "thekla": "Thekla",
  "volkmarsdorf": "Volkmarsdorf",
  "wahren": "Wahren",
  "wiederitzsch": "Wiederitzsch",
  "zentrum": "Zentrum",
  "zentrum-nord": "Zentrum-Nord",
  "zentrum-nordwest": "Zentrum-Nordwest",
  "zentrum-ost": "Zentrum-Ost",
  "zentrum-sued": "Zentrum-Süd",
  "zentrum-suedost": "Zentrum-Südost",
  "zentrum-west": "Zentrum-West",
  "alle": "Alle",
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
        state.getLastTreeLayer().clearLayers()
        state.getTreeMap().removeLayer(state.getLastClusterLayer());
        state.getTreeMap().removeLayer(state.getLastDistrictLayer());
        state.resetStreets();
        state.resetTreeTypes();
        state.resetTreeSpecieses();
        state.resetYearFroms();
        state.resetYearTos();
        state.setStreetExplicitySet(false);
        state.setTreeTypeExplicitySet(false);
        state.setTreeSpeciesExplicitySet(false);
        state.setYearFromExplicitySet(false);
        state.setYearToExplicitySet(false);
        state.setLastSelectedStreet(0);
        state.setLastSelectedTreeType(0);
        state.setLastSelectedTreeSpecies(0);
        state.setLastSelectedYearFrom(0);
        state.setLastSelectedYearTo(0);
        data.loadData(state, selectedDistrict);
        $('#streetSelection option:eq(0)').prop('selected', true);
        $('#treeTypeSelection option:eq(0)').prop('selected', true);
        $('#treeSpeciesSelection option:eq(0)').prop('selected', true);
        $('#yearFromSelection option:eq(0)').prop('selected', true);
        $('#yearToSelection option:eq(0)').prop('selected', true);
      }
    }
  }
}));