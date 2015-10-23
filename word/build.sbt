enablePlugins(ScalaJSPlugin)

name := "Scala.js Tutorial"

scalaVersion := "2.11.7" // or any other Scala version >= 2.10.2

scalaJSStage in Global := FastOptStage

val jsDir = "js"

crossTarget in (Compile, fullOptJS) := file(jsDir)

crossTarget in (Compile, fastOptJS) := file(jsDir)

crossTarget in (Compile, packageJSDependencies) := file(jsDir)

//crossTarget in (Compile, packageLauncher) := file(jsDir)

libraryDependencies += "org.scala-js" %%% "scalajs-dom" % "0.8.0"

libraryDependencies += "be.doeraene" %%% "scalajs-jquery" % "0.8.0"

skip in packageJSDependencies := false
