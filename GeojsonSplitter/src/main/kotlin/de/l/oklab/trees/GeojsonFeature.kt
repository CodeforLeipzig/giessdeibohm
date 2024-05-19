package de.l.oklab.pumps.data

import de.l.oklab.trees.GeojsonUtils.toCoord

data class GeojsonFeatureCollection<T>(
    val type: String = "FeatureCollection",
    val name: String? = null,
    val crs: Crs? = null,
    val features: List<GeojsonFeature<T>>
)

data class Crs(
    val type: String?,
    val properties: Map<String, Any?>,
)

data class GeojsonFeature<T>(
    val type: String = "Feature",
    val properties: T,
    val geometry: Geometry? = null,
    val id: String? = null
) {

    fun <U> toFeature(transform: (T) -> U): GeojsonFeature<U> =
        GeojsonFeature(
            properties = transform(this.properties),
            geometry = this.geometry,
            id = this.id
        )
}

data class Geometry(
    val type: String = "Point",
    val coordinates: List<Float>? = null
) {
    companion object {

        fun from(lon: String?, lat: String?) = Geometry(
            coordinates = listOfNotNull(toCoord(lon), toCoord(lat))
        )
    }
}