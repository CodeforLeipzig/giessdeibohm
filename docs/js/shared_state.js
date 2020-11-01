define({
  state: () => {
    var treeMap;
    var lastSelectedDistrict;
    var lastSelectedStreet;
    var streetExplicitySet = false;
    var lastSelectedTreeType;
    var treeTypeExplicitySet = false;
    var oldLayer;
    var lastCoordinates;
    var lastTreeLayer;
    var lastDistrictLayer;
    var selectedTree;
    var streets = [ " " ];
    var treeTypes = [ " " ];
    var lastHoveredCoords;
    var info;

    return {
      getTreeMap: () => { return treeMap },
      getLastSelectedDistrict: () => { return lastSelectedDistrict },
      getLastSelectedStreet: () => { return lastSelectedStreet },
      getLastSelectedTreeType: () => { return lastSelectedTreeType },
      getOldLayer: () => { return oldLayer },
      getLastCoordinates: () => { return lastCoordinates },
      getLastTreeLayer: () => { return lastTreeLayer },
      getLastDistrictLayer: () => { return lastDistrictLayer },
      getSelectedTree: () => { return selectedTree },
      getLastHoveredCoords: () => { return lastHoveredCoords },
      getInfo: () => { return info },
      getStreets: ()  => { return streets.sort() },
      getTreeTypes: ()  => { return treeTypes.sort() },
      getStreetExplicitySet: () => { return streetExplicitySet },
      getTreeTypeExplicitySet: () => { return treeTypeExplicitySet },

      setTreeMap: (newTreeMap) => { treeMap = newTreeMap },
      setLastSelectedDistrict: (newLastSelectedDistrict) => { lastSelectedDistrict = newLastSelectedDistrict },
      setLastSelectedStreet: (newLastSelectedStreet) => { lastSelectedStreet = newLastSelectedStreet },
      setLastSelectedTreeType: (newLastSelectedTreeType) => { lastSelectedTreeType = newLastSelectedTreeType },
      setOldLayer: (newOldLayer) => { oldLayer = newOldLayer },
      setLastCoordinates: (newLastCoordinates) => { lastCoordinates = newLastCoordinates },
      setLastTreeLayer: (newLastTreeLayer) => { lastTreeLayer = newLastTreeLayer },
      setLastDistrictLayer: (newLastDistrictLayer) => { lastDistrictLayer = newLastDistrictLayer },
      setSelectedTree: (newSelectedTree) => { selectedTree = newSelectedTree },
      setLastHoveredCoords: (newLastHoveredCoords) => { lastHoveredCoords = newLastHoveredCoords },
      setInfo: (newInfo) => { info = newInfo },
      addStreet: (street) => { if (streets.indexOf(street) < 0) streets.push(street) },
      resetStreets: () => { streets = [ " " ] },
      addTreeType: (treeType) => { if (treeTypes.indexOf(treeType) < 0) treeTypes.push(treeType) },
      resetTreeTypes: () => { treeTypes = [ " " ] },
      setStreetExplicitySet: (newStreetExplicitySet) => { streetExplicitySet = newStreetExplicitySet },
      setTreeTypeExplicitySet: (newTreeTypeExplicitySet) => { treeTypeExplicitySet = newTreeTypeExplicitySet },
    }
  }
});


