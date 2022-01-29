package de.l.oklab.trees

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class GeojsonFeatureCollection<T>(
    val type: String = "FeatureCollection",
    val features: List<GeojsonFeature<T>>
)

data class GeojsonFeature<T>(
    val type: String = "Feature",
    val properties: T,
    val geometry: Geometry? = null,
    val id: String? = null
)

data class Geometry(
    val type: String = "Point",
    val coordinates: List<Float>? = null
) {
    companion object {

        fun from(lon: String?, lat: String?) = Geometry(
            coordinates = listOfNotNull(toCoord(lon), toCoord(lat))
        )

        fun toCoord(value: String?): Float? =
            if (value.isNullOrEmpty()) null else if (value.indexOf(".") > 0) value.toFloat() else
                (value.substring(0, 2) + "." + value.substring(2)).toFloat()
    }
}