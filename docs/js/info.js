define(["jquery", "leaflet", "leaflet.ajax", "district"], ($, leaflet, leafletAjax, district) => {
  return {
    configureInfo: (state) => {
      // control that shows state info on hover
      var info = leaflet.control();
      info.onAdd = function (map) {
        this._div = leaflet.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };
      info.update = function (id, props) {
        var htmlInner = '<div style="width: 300px;">';
        if (!props) {
            htmlInner += '<h4>Hovere &uuml;ber einen Baum</h4>'
        } else {
            htmlInner += '<h4>Infos</h4>'
        }
        htmlInner += district.districtSelectionBox(state);
        htmlInner += "<ul>"
        htmlInner += "<li><b>Standortnummer:</b> "
          if (props) {
          htmlInner += props["Standortnu"] + "</li>"
          }
        htmlInner += "<li><b>Ortsteil:</b> "
          if (props) {
          htmlInner += props["Ortsteil"] + "</li>"
          }
        htmlInner += "<li><b>Straßenname:</b> "
          if (props) {
          htmlInner += props["Strasse_Na"] + "</li>"
          }
        htmlInner += "<li><b>Baumart:</b> "
          if (props) {
          htmlInner += props["Baumart_de"] + "</li>"
          }
        htmlInner += "<li><b>Baumart (wissenschaftlich):</b> "
          if (props) {
          htmlInner += props["Baumart_wi"] + "</li>"
          }
        htmlInner += "<li><b>Pflanzjahr:</b> "
          if (props) {
          htmlInner += props["Pflanzjahr"] + "</li>"
          }
        if (props) {
          htmlInner += "<li><a href=\"https://docs.google.com/spreadsheets/d/1Y3eo3r1Ie03VkmS1PpvNZsEW1zMKwDzfNg7lYSXG3Z8/edit#gid=1991371235&range=G7\">Google Doc</a></li>"
        }
        htmlInner += "</ul>"
        htmlInner += '</div>';
        this._div.innerHTML = htmlInner;
        district.setDistrictInSelectionBox(state);
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