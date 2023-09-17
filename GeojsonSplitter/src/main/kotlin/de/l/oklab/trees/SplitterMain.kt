package de.l.oklab.trees

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ArrayNode
import java.io.File
import java.util.*

const val outputPath = "D:/"

sealed class Config(
        val path: String,
        val idProp: String
)

data class TreeConfig(val id: String = "tree"): Config(path = "D:/20230915.geojson", idProp = "ortsteil")
data class DistrictConfig(val id: String = "district"): Config(path = "D:\\git\\opendata-leipzig-playground\\docs\\ortsteile.json", idProp = "Name")

fun main() {
    execute(TreeConfig())
}

fun execute(config: Config) {
    val objectMapper = ObjectMapper()
    val rootNode = objectMapper.readValue(File(config.path), JsonNode::class.java)
    val featuresNode = rootNode.get("features") as ArrayNode
    val districtNames = getDistrictNames(config, featuresNode)
    for (districtName in districtNames) {
        try {
            storeGeojsonFile(config, districtName, featuresNode)
        } catch (e: Exception) {
            println("$districtName: $e")
        }
    }
}

fun getDistrictNames(config: Config, featuresNode: ArrayNode): List<String> {
    val names = mutableSetOf<String>()
    names.addAll(featuresNode.map { it.get("properties").get(config.idProp).asText() })
    return names.toList().sorted()
}

fun storeGeojsonFile(config: Config, districtName: String, featuresNode: ArrayNode) {
    val objectMapper = ObjectMapper()
    val content = featureCollection(filterByDistrictName(config, districtName, featuresNode).map { it.toString() })
    val root = objectMapper.readTree(content)
    val normalizedDistrictName = normalizeName(districtName)
    val file = File("$outputPath/$normalizedDistrictName.geojson")
    objectMapper.writeValue(file, root)
    println("${file.absolutePath} written")
}

fun filterByDistrictName(config: Config, districtName: String, featuresNode: ArrayNode): List<JsonNode> =
        featuresNode.filter { node -> node.get("properties").get(config.idProp).asText() == districtName }

fun normalizeName(name: String): String = name.lowercase(Locale.getDefault())
        .replace("/", "_")
        .replace("ä", "ae")
        .replace("ö", "oe")
        .replace("ü", "ue")
        .replace("ß", "ss")

fun featureCollection(features: List<String>): String {
    return """{
      "type": "FeatureCollection",
      "features": [
         ${features.joinToString(",")}
      ]
    }"""
}