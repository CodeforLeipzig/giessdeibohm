package de.l.oklab.trees

import de.l.oklab.pumps.data.GeojsonFeature
import de.l.oklab.trees.DistrictUtils.filterByDistrictName
import de.l.oklab.trees.DistrictUtils.getDistrictNames
import de.l.oklab.trees.GeojsonUtils.readGeojsonFile
import de.l.oklab.trees.GeojsonUtils.storeGeojsonFile

const val outputPath = "/home/joerg/documents/"

sealed class Config(
    val path: String,
)

data class TreeConfig(val id: String = "tree") : Config(path = "/home/joerg/documents/20240518.geojson")

fun main() {
    execute(TreeConfig())
}

fun execute(config: Config) {
    val rootNode = readGeojsonFile(config.path, TreeIn::class.java)
    val districtNames = getDistrictNames(rootNode.features)
    for (districtName in districtNames) {
        try {
            storeDistrictGeojsonFile(districtName, rootNode.features)
        } catch (e: Exception) {
            println("""$districtName: $e""")
        }
    }
}

fun storeDistrictGeojsonFile(districtName: String, features: List<GeojsonFeature<TreeIn>>) {
    val content = filterByDistrictName(districtName, features)
    storeGeojsonFile(districtName, content)
}