package de.l.oklab.trees

import com.fasterxml.jackson.annotation.JsonProperty

data class TreeOut (
    val standortnr: String?,
    val strasse: String?,
    val ortsteil: String?,
    @JsonProperty("baumart_wi")
    val baumartWi: String?,
    @JsonProperty("baumart_de")
    val baumartDe: String?,
    val gattung: String?,
    val pflanzjahr: Int?,
    val baumhoehe: Int?,
    @JsonProperty("kr_durchm")
    val kronenDurchmesser: String?,
    @JsonProperty("st_durchm")
    val stammDurchmesser: String?,
    @JsonProperty("st_umfang")
    val stammUmfang: String?,
    val gebiet: String?,
)