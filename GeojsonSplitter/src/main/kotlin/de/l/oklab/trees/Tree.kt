package de.l.oklab.trees

import com.fasterxml.jackson.annotation.JsonProperty

data class Tree (
    val standortnr: String?,
    val strasse: String?,
    val ortsteil: String?,
    @JsonProperty("baumart_wi")
    val baumartWi: String?,
    @JsonProperty("baumart_de")
    val baumartDe: String?,
    val gattung: String?,
    val pflanzjahr: Int?,
    val alter: Int?,
    @JsonProperty("dat_abgabe")
    val datAbgabe: String?,
    val xcoord: Double?,
    val ycoord: Double?
)