package de.l.oklab.trees

import de.l.oklab.pumps.data.GeojsonFeature

object DistrictUtils {

    fun getDistrictNames(features: List<GeojsonFeature<TreeIn>>): List<String> {
        val names = mutableSetOf<String>()
        features.forEach { it.properties.ortsteil?.let { name -> names.add(name) } }
        names.add("alle")
        return names.toList().sorted()
    }

    fun filterByDistrictName(
        districtName: String,
        features: List<GeojsonFeature<TreeIn>>
    ): List<GeojsonFeature<TreeOut>> =
        features.filter { node -> districtName == "alle" || node.properties.ortsteil == districtName }.map {
            it.toFeature(TreeIn::toTreeOut)
        }
}