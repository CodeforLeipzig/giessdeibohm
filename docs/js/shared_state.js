define({
  state: () => {
    var zoomLevel = 15;
    var treeId;
    var treeMap;
    var lastSelectedDistrict;
    var lastSelectedStreet;
    var streetExplicitySet = false;
    var lastSelectedTreeType;
    var lastSelectedTreeSpecies;
    var treeTypeExplicitySet = false;
    var treeSpeciesExplicitySet = false;
    var lastSelectedYearFrom;
    var yearFromExplicitySet = false;
    var lastSelectedYearTo;
    var yearToExplicitySet = false;
    var oldLayer;
    var lastCoordinates;
    var lastTreeLayer;
    var lastClusterLayer;
    var lastDistrictLayer;
    var selectedTree;
    var streets = [ " " ];
    var treeTypes = [ " " ];
    var treeSpecieses = [ " " ];
    var yearFroms = [ " " ];
    var yearTos = [ " " ];
    var lastHoveredCoords;
    var info;
    var matchCount = 0;
    var treeLocs = new Map();
    var currentPosition;
    var shareLocation = false;

    return {
      getZoomLevel: () => { return zoomLevel },
      getTreeId: () => { return treeId },
      getTreeMap: () => { return treeMap },
      getLastSelectedDistrict: () => { return lastSelectedDistrict },
      getLastSelectedStreet: () => { return lastSelectedStreet },
      getLastSelectedTreeType: () => { return lastSelectedTreeType },
      getLastSelectedTreeSpecies: () => { return lastSelectedTreeSpecies },
      getLastSelectedYearFrom: () => { return lastSelectedYearFrom },
      getLastSelectedYearTo: () => { return lastSelectedYearTo },
      getOldLayer: () => { return oldLayer },
      getLastCoordinates: () => { return lastCoordinates },
      getLastTreeLayer: () => { return lastTreeLayer },
      getLastClusterLayer: () => { return lastClusterLayer },
      getLastDistrictLayer: () => { return lastDistrictLayer },
      getSelectedTree: () => { return selectedTree },
      getLastHoveredCoords: () => { return lastHoveredCoords },
      getInfo: () => { return info },
      getStreets: ()  => { return streets.sort() },
      getTreeTypes: ()  => { return treeTypes.sort() },
      getTreeSpecieses: ()  => { return treeSpecieses.sort() },
      getYearFroms: ()  => { return yearFroms.sort() },
      getYearTos: ()  => { return yearTos.sort() },
      getStreetExplicitySet: () => { return streetExplicitySet },
      getTreeTypeExplicitySet: () => { return treeTypeExplicitySet },
      getTreeSpeciesExplicitySet: () => { return treeSpeciesExplicitySet },
      getYearFromExplicitySet: () => { return yearFromExplicitySet },
      getYearToExplicitySet: () => { return yearToExplicitySet },
      getMatchCount: () => { return matchCount },
      hasTreeLocs: () => treeLocs.size > 0,
      getNearestTreeLoc: (userLoc) => [...treeLocs].map(([, value]) => value).reduce((currMin, treeLoc) => {
          const dist = Math.hypot(userLoc.lng - treeLoc.x, userLoc.lat - treeLoc.y)
          return (currMin.dist > dist) ? { dist, ...treeLoc } : currMin;
        }, { dist: Number.MAX_VALUE }),
      getCurrentPosition: () => { return currentPosition; },
      isShareLocation: () => { return shareLocation; },

      setTreeId: (newTreeId) => { treeId = newTreeId },
      setTreeMap: (newTreeMap) => { treeMap = newTreeMap },
      setLastSelectedDistrict: (newLastSelectedDistrict) => { lastSelectedDistrict = newLastSelectedDistrict },
      setLastSelectedStreet: (newLastSelectedStreet) => { lastSelectedStreet = newLastSelectedStreet },
      setLastSelectedTreeType: (newLastSelectedTreeType) => { lastSelectedTreeType = newLastSelectedTreeType },
      setLastSelectedTreeSpecies: (newLastSelectedTreeSpecies) => { lastSelectedTreeSpecies = newLastSelectedTreeSpecies },
      setLastSelectedYearFrom: (newLastSelectedYearFrom) => { lastSelectedYearFrom = newLastSelectedYearFrom },
      setLastSelectedYearTo: (newLastSelectedYearTo) => { lastSelectedYearTo = newLastSelectedYearTo },
      setOldLayer: (newOldLayer) => { oldLayer = newOldLayer },
      setLastCoordinates: (newLastCoordinates) => { lastCoordinates = newLastCoordinates },
      setLastTreeLayer: (newLastTreeLayer) => { lastTreeLayer = newLastTreeLayer },
      setLastClusterLayer: (newLastClusterLayer) => { lastClusterLayer = newLastClusterLayer },
      setLastDistrictLayer: (newLastDistrictLayer) => { lastDistrictLayer = newLastDistrictLayer },
      setSelectedTree: (newSelectedTree) => { selectedTree = newSelectedTree },
      setLastHoveredCoords: (newLastHoveredCoords) => { lastHoveredCoords = newLastHoveredCoords },
      setInfo: (newInfo) => { info = newInfo },
      addStreet: (street) => { if (streets.indexOf(street) < 0) streets.push(street) },
      resetStreets: () => { streets = [ " " ] },
      addTreeType: (treeType) => { if (treeTypes.indexOf(treeType) < 0) treeTypes.push(treeType) },
      resetTreeTypes: () => { treeTypes = [ " " ] },
      addTreeSpecies: (treeSpecies) => { if (treeSpecieses.indexOf(treeSpecies) < 0) treeSpecieses.push(treeSpecies) },
      resetTreeSpecieses: () => { treeSpecieses = [ " " ] },
      addYearFrom: (yearFrom) => { if (yearFroms.indexOf(yearFrom) < 0) yearFroms.push(yearFrom) },
      resetYearFroms: () => { yearFroms = [ " " ] },
      addYearTo: (yearTo) => { if (yearTos.indexOf(yearTo) < 0) yearTos.push(yearTo) },
      resetYearTos: () => { yearTos = [ " " ] },
      setStreetExplicitySet: (newStreetExplicitySet) => { streetExplicitySet = newStreetExplicitySet },
      setTreeTypeExplicitySet: (newTreeTypeExplicitySet) => { treeTypeExplicitySet = newTreeTypeExplicitySet },
      setTreeSpeciesExplicitySet: (newTreeSpeciesExplicitySet) => { treeSpeciesExplicitySet = newTreeSpeciesExplicitySet },
      setYearFromExplicitySet: (newYearFromExplicitySet) => { yearFromExplicitySet = newYearFromExplicitySet },
      setYearToExplicitySet: (newYearToExplicitySet) => { yearToExplicitySet = newYearToExplicitySet },
      setMatchCount: (newMatchCount) => { matchCount = newMatchCount},
      setTreeLoc: (treeLoc) => { treeLocs.set(treeLoc.id, treeLoc) },
      setCurrentPosition: position => {
        if (position) {
          currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        } else {
          currentPosition = undefined;
        }
      },
      setShareLocation: (newShareLocation) => { shareLocation = newShareLocation; }
    }
  }
});


