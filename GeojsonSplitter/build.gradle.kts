group = "de.l.oklab.trees"
version = "0.1-SNAPSHOT"

plugins {
    application
    kotlin("jvm") version "1.4.10"
}

java {
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
}

repositories {
    jcenter()
    maven("https://repo.maven.apache.org/maven2/")
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-gradle-plugin:1.4.10")
    compile("com.fasterxml.jackson.core:jackson-core:2.9.9")
    compile("com.fasterxml.jackson.core:jackson-annotations:2.9.9")
    compile("com.fasterxml.jackson.core:jackson-databind:2.9.9")
	testImplementation("org.junit.jupiter:junit-jupiter-api:5.3.1")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.3.1")
    implementation(kotlin("stdlib"))
}

application {
    mainClassName = "de.l.oklab.trees.SplitterMain"
}



