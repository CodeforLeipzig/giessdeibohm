package de.l.oklab.trees

import com.fasterxml.jackson.annotation.JsonProperty

data class TreeIn(
    @JsonProperty("baumnummer")
    val standortnr: String?,
    val strasse: String?,
    @JsonProperty("ot")
    val ortsteil: String?,
    @JsonProperty("ga_lang_wiss")
    val baumartWi: String?,
    @JsonProperty("ga_lang_deutsch")
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
    val alter: Int?,
    @JsonProperty("fme_tstamp")
    val datAbgabe: String?,
    val xcoord: Double?,
    val ycoord: Double?,
    @JsonProperty("objectid")
    val objectId: String,
    @JsonProperty("objektkuerzel")
    val objektKuerzel: String?,
    @JsonProperty("nachpflanzung_geplant")
    val nachpflanzungGeplant: String?,
    @JsonProperty("status_patenbaum")
    val statusPatenschaft: String?,
    @JsonProperty("patenschaftsnummer")
    val patenschaftsId: String?,
    @JsonProperty("standzeitraum")
    val standzeitraum: String?,
    @JsonProperty("letzte_bewaesserung")
    val letzteBewaesserung: String?,
) {

    fun toTreeOut() = TreeOut(
        standortnr = this.standortnr,
        strasse = this.strasse,
        ortsteil = this.ortsteil,
        baumartWi = this.baumartWi,
        baumartDe = this.baumartDe,
        gattung = this.gattung,
        pflanzjahr = this.pflanzjahr,
        baumhoehe = this.baumhoehe,
        kronenDurchmesser = this.kronenDurchmesser,
        stammDurchmesser = this.stammDurchmesser,
        stammUmfang = this.stammUmfang,
        gebiet = this.gebiet,
    )
}