package de.l.oklab.trees

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ArrayNode
import java.io.File

const val outputPath = "D:/"

fun main() {
    val objectMapper = ObjectMapper()
    val rootNode = objectMapper.readValue(File(/*"D:/20201030.geojson"*/"D:\\git\\opendata-leipzig-playground\\docs\\ortsteile.json"),
            JsonNode::class.java)
    val featuresNode = rootNode.get("features") as ArrayNode
    val districtNames = getDistrictNames(featuresNode)
    for (districtName in districtNames) {
        try {
            storeGeojsonFile(districtName, featuresNode)
        } catch (e: Exception) {
            println("""$districtName: $e""")
        }
    }
}

fun getDistrictNames(featuresNode: ArrayNode): List<String> {
    val names = mutableSetOf<String>()
    names.addAll(featuresNode.map { it.get("properties").get(/*"ortsteil"*/"Name").asText() })
    return names.toList().sorted()
}

fun storeGeojsonFile(districtName: String, featuresNode: ArrayNode) {
    val objectMapper = ObjectMapper()
    val content = featureCollection(filterByDistrictName(districtName, featuresNode).map { it.toString() })
    val root = objectMapper.readTree(content)
    val normalizedDistrictName = normalizeName(districtName)
    val file = File("""$outputPath/$normalizedDistrictName.geojson""")
    objectMapper.writeValue(file, root)
    println(""""${file.absolutePath} written""")
}

fun filterByDistrictName(districtName: String, featuresNode: ArrayNode): List<JsonNode> =
        featuresNode.filter { node -> node.get("properties").get(/*"ortsteil"*/"Name").asText() == districtName }

fun normalizeName(name: String): String = name.toLowerCase()
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