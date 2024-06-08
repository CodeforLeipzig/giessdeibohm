group = "de.l.oklab.trees"
version = "0.1-SNAPSHOT"

plugins {
    application
    idea
    kotlin("jvm")
}

java {
    sourceCompatibility = JavaVersion.VERSION_19
    targetCompatibility = JavaVersion.VERSION_19
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-gradle-plugin:_")
    implementation("com.fasterxml.jackson.core:jackson-core:_")
    implementation("com.fasterxml.jackson.core:jackson-annotations:_")
    implementation("com.fasterxml.jackson.core:jackson-databind:_")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:_")
    implementation("org.eclipse.jgit:org.eclipse.jgit:_")
    testImplementation(Testing.junit.jupiter.api)
    testRuntimeOnly(Testing.junit.jupiter.engine)
    implementation(kotlin("stdlib"))
}

application {
    mainClass.set("de.l.oklab.trees.SplitterMainKt")
}



