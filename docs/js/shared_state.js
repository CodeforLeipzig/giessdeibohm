define({
  allDistricts: [
    "altlindenau",
    "lindenau",
    "neulindenau",
    "plagwitz",
    "schleussig"
  ],
  state: () => {
    var treeMap;
    var lastSelectedDistrict;
    var oldLayer;
    var lastCoordinates;
    var lastTreeLayer;
    var lastDistrictLayer;
    var selectedTree;
    var lastHoveredCoords;
    var info;
    var oldHtmlCode = '';

    return {
      getTreeMap: () => { return treeMap },
      getLastSelectedDistrict: () => { return lastSelectedDistrict },
      getOldLayer: () => { return oldLayer },
      getLastCoordinates: () => { return lastCoordinates },
      getLastTreeLayer: () => { return lastTreeLayer },
      getLastDistrictLayer: () => { return lastDistrictLayer },
      getSelectedTree: () => { return selectedTree },
      getLastHoveredCoords: () => { return lastHoveredCoords },
      getInfo: () => { return info },
      getOldHtmlCode: ()  => { return oldHtmlCode },

      setTreeMap: (newTreeMap) => { treeMap = newTreeMap },
      setLastSelectedDistrict: (newLastSelectedDistrict) => { lastSelectedDistrict = newLastSelectedDistrict },
      setOldLayer: (newOldLayer) => { oldLayer = newOldLayer },
      setLastCoordinates: (newLastCoordinates) => { lastCoordinates = newLastCoordinates },
      setLastTreeLayer: (newLastTreeLayer) => { lastTreeLayer = newLastTreeLayer },
      setLastDistrictLayer: (newLastDistrictLayer) => { lastDistrictLayer = newLastDistrictLayer },
      setSelectedTree: (newSelectedTree) => { selectedTree = newSelectedTree },
      setLastHoveredCoords: (newLastHoveredCoords) => { lastHoveredCoords = newLastHoveredCoords },
      setInfo: (newInfo) => { info = newInfo },
      setOldHtmlCode: (newOldHtmlCode) => { oldHtmlCode = newOldHtmlCode }
    }
  }
});


