package tutorial.webapp

import scala.scalajs.js.JSApp
import org.scalajs.dom
import dom.document
import org.scalajs.jquery.jQuery

object TutorialApp extends JSApp {

    def appendPar(targetNode: dom.Node, text: String): Unit = {
        jQuery("body").append("<p>[message]</p>")
    }

  def main(): Unit = {
      appendPar(document.body, "Hello World")
  }
}
