package de.l.oklab.trees

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.eclipse.jgit.api.Git
import org.eclipse.jgit.storage.file.FileRepositoryBuilder
import org.eclipse.jgit.treewalk.TreeWalk
import java.io.File
import java.text.SimpleDateFormat
import java.util.*


fun main() {
    val objectMapper = jacksonObjectMapper()
    val builder = FileRepositoryBuilder()
    val repository = builder.setGitDir(File("D:\\git\\giessdeibohm\\.git"))
        .readEnvironment()
        .findGitDir()
        .build()
    val git = Git(repository)
    val revisionId = repository.findRef("refs/heads/master").objectId
    val relativeFilePath = "docs/geojsons/trees/alle.geojson"
    val targetFileLogs = git.log().add(revisionId).addPath(relativeFilePath).call()
    val sdf = SimpleDateFormat("yyyy-MM-dd")
    for (targetFileLog in targetFileLogs.reversed()) {
        val reader = repository.newObjectReader()
        val treeWalk = TreeWalk.forPath(git.repository, relativeFilePath, targetFileLog.tree)
        val blobId = treeWalk.getObjectId(0)
        val objectLoader = reader.open(blobId)
        val content = String(objectLoader.bytes)
        val trees: GeojsonFeatureCollection<Tree> = objectMapper.readValue(content, objectMapper.typeFactory.constructParametricType(
            GeojsonFeatureCollection::class.java, Tree::class.java
        ))
        println("${sdf.format(Date(targetFileLog.commitTime.toLong().times(1000)))}: ${(trees.features.size)} trees")
    }
}
