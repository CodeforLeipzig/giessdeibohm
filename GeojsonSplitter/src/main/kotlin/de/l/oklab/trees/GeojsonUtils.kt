package de.l.oklab.trees

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import de.l.oklab.pumps.data.GeojsonFeature
import de.l.oklab.pumps.data.GeojsonFeatureCollection
import java.io.File
import java.util.*

object GeojsonUtils {
    private val objectMapper = jacksonObjectMapper()

    fun <T> readGeojsonFile(fileName: String, clazz: Class<T>): GeojsonFeatureCollection<T> = objectMapper.readValue(
        File(fileName), objectMapper.typeFactory.constructParametricType(
            GeojsonFeatureCollection::class.java, clazz
        )
    )

    fun <T> storeGeojsonFile(fileName: String, features: List<GeojsonFeature<T>>) {
        val root = GeojsonFeatureCollection(features = features)
        val normalizedFileName = normalizeName(fileName)
        val file = File("""$outputPath/$normalizedFileName.geojson""")
        objectMapper.writeValue(file, root)
        println(""""${file.absolutePath} written""")
    }

    private fun normalizeName(name: String): String = name.lowercase(Locale.getDefault())
        .replace("ä", "ae")
        .replace("ö", "oe")
        .replace("ü", "ue")
        .replace("ß", "ss")

    fun toCoord(value: String?): Float? =
        if (value.isNullOrEmpty()) null else if (value.indexOf(".") > 0) value.toFloat() else
                (value.substring(0, 2) + "." + value.substring(2)).toFloat()
}