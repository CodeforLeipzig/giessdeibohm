define(["jquery", "leaflet", "leaflet.ajax", "district", "street", "tree_type", "tree_species", "year_from", "year_to", "location"], ($, leaflet, leafletAjax, district, street, treeType, treeSpecies, yearFrom, yearTo, location) => {
  return {
    configureInfo: (state, data) => {
      // control that shows state info on hover
      var info = leaflet.control();
      info.onAdd = function (map) {
        this._div = leaflet.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };
      info.update = function (id, props) {
        var htmlInner = '<div style="width: 350px;">';
        htmlInner += '<input id="shareLocation" type="button" value="Teile Standort" />'
        htmlInner += "<br /><br />"
        if (!props) {
          htmlInner += '<h4>Hovere &uuml;ber einen Baum</h4>'
        } else {
          htmlInner += '<h4>Infos</h4>'
        }
        htmlInner += "<br />"
        htmlInner += "<b>Suchtreffer:</b> "
        htmlInner += state.getMatchCount();
        htmlInner += "<br /><br />"
        htmlInner += "<b>Ortsteil:</b> "
        htmlInner += district.districtSelectionBox(state);
        htmlInner += "<br /><br />"
        htmlInner += "<b>Standortnummer:</b> "
        if (props) {
          htmlInner += props["standortnr"]
        }
        htmlInner += "<br /><br />"
        htmlInner += "<b>Straßenname:</b> "
        htmlInner += street.streetSelectionBox(state);
        if (props) {
          state.setLastSelectedStreet(state.getStreets().indexOf(props["strasse"]));
        } else if (!state.getStreetExplicitySet()) {
          state.setLastSelectedStreet(0);
        }
        htmlInner += "<br /><br />"
        htmlInner += "<b>Gattung:</b> "
        htmlInner += treeSpecies.treeSpeciesSelectionBox(state);
        if (props) {
          state.setLastSelectedTreeSpecies(state.getTreeSpecieses().indexOf(props["gattung"]));
        } else if (!state.getTreeSpeciesExplicitySet()) {
          state.setLastSelectedTreeSpecies(0);
        }
        htmlInner += "<br /><br />"
        htmlInner += "<b>Baumart:</b> "
        htmlInner += treeType.treeTypeSelectionBox(state);
        if (props) {
          state.setLastSelectedTreeType(state.getTreeTypes().indexOf(props["baumart_de"]));
        } else if (!state.getTreeTypeExplicitySet()) {
          state.setLastSelectedTreeType(0);
        }
        htmlInner += "<br /><br />"
        htmlInner += "<b>Baumart (wissenschaftlich):</b> "
        if (props) {
          htmlInner += props["baumart_wi"]
        }
        htmlInner += "<br /><br />"
        htmlInner += "<b>Pflanzjahr:</b> zwischen "
        htmlInner += yearFrom.yearFromSelectionBox(state);
        if (props) {
          state.setLastSelectedYearFrom(state.getYearFroms().indexOf(props["pflanzjahr"]));
        } else {
          state.setLastSelectedYearFrom(state.getYearFromExplicitySet());
        }
        htmlInner += " und "
        htmlInner += yearTo.yearToSelectionBox(state);
        if (props) {
          state.setLastSelectedYearTo(state.getYearTos().indexOf(props["pflanzjahr"]));
        } else {
          state.setLastSelectedYearTo(state.getYearToExplicitySet());
        }
        if (props) {
          htmlInner += "<br /><br />"
          htmlInner += "<a href=\"https://docs.google.com/spreadsheets/d/1Y3eo3r1Ie03VkmS1PpvNZsEW1zMKwDzfNg7lYSXG3Z8/edit#gid=1991371235&range=G7\">Google Doc</a>"
        }
        htmlInner += '</div>';
        this._div.innerHTML = htmlInner;
        district.setDistrictInSelectionBox(state);
        street.setStreetInSelectionBox(state);
        treeType.setTreeTypeInSelectionBox(state);
        treeSpecies.setTreeSpeciesInSelectionBox(state);
        yearFrom.setYearFromInSelectionBox(state);
        yearTo.setYearToInSelectionBox(state);
        $("#districtSelection").off('change');
        $("#districtSelection").on('change', function(e) {
          district.handleDistrictChange(document, data, state);
          state.getInfo().update();
        });
        $("#streetSelection").off('change');
        $("#streetSelection").on('change', function(e) {
          state.setStreetExplicitySet(true);
          street.handleStreetChange(document, data, state);
          state.setStreetExplicitySet(state.getLastSelectedStreet() != 0);
        });
        $("#treeTypeSelection").off('change');
        $("#treeTypeSelection").on('change', function(e) {
          state.setTreeTypeExplicitySet(true);
          treeType.handleTreeTypeChange(document, data, state);
          state.setTreeTypeExplicitySet(state.getLastSelectedTreeType() != 0);
        });
        $("#treeSpeciesSelection").off('change');
        $("#treeSpeciesSelection").on('change', function(e) {
          state.setTreeSpeciesExplicitySet(true);
          treeSpecies.handleTreeSpeciesChange(document, data, state);
          state.setTreeSpeciesExplicitySet(state.getLastSelectedTreeSpecies() != 0);
        });
        $("#yearFromSelection").off('change');
        $("#yearFromSelection").on('change', function(e) {
          state.setYearFromExplicitySet(true);
          yearFrom.handleYearFromChange(document, data, state);
          state.setYearFromExplicitySet(state.getLastSelectedYearFrom());
        });
        $("#yearToSelection").off('change');
        $("#yearToSelection").on('change', function(e) {
          state.setYearToExplicitySet(true);
          yearTo.handleYearToChange(document, data, state);
          state.setYearToExplicitySet(state.getLastSelectedYearTo());
        });
        $("#shareLocation").on('click', function(e) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              state.setShareLocation(true);
              location.fillTreeLocations(state).then(() => {
                state.setCurrentPosition(position);
                location.setNearestDistrict(state, data);
              });
            });
          }
        })
      }
      state.setInfo(info);
      return info;
    },
    highlightFeature: (state, e) => {
      var layer = e.target;
      if (!leaflet.Browser.ie && !leaflet.Browser.opera && !leaflet.Browser.edge) {
        layer.bringToFront();
      }
      state.getInfo().update(e.layer.feature.id, e.layer.feature.properties);
    },
    resetHighlight: (state, e) => {
      state.getInfo().update();
    }
  };
});