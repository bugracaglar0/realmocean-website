import { Text, UIController, UIRoute, UIRouteOutlet, UIRoutes, UIView } from "@tuval/forms"
import { LayoutController } from "./controllers/LayoutController"
import { LoginController } from "./controllers/LoginController"
import { HomeController } from "./controllers/HomeController"
import { SignupController } from "./controllers/SignupController"
import { LoginSuccess } from "./controllers/LoginSuccess"
import { CreateProjectController } from "./controllers/CreateProjectController";
import { ProjectView } from "./controllers/Views/ProjectView";
import { LeftSideMenu } from "./controllers/LeftSideMenu"

class KontDrakula extends UIController {
    LoadView(): UIView {
        return (
            UIRouteOutlet().width('100%').height('100%')
        )
    }
}
class AddController extends UIController {
    LoadView(): UIView {
        return (
            Text('asdfdf')
        )
    }
}
export const Routes = () => {
    return (
        UIRoutes(
            UIRoute('/app/home', HomeController),
            UIRoute('/', LoginController),
            UIRoute('/login', LoginController),
            UIRoute('/signup', SignupController),
            UIRoute('/logout', LoginController),
            UIRoute('/app/loginsuccess', LoginSuccess),
            UIRoute('/app/layout',LayoutController),
            UIRoute('/app/leftsidemenu',LeftSideMenu)   ,         
            UIRoute('/app/projects', CreateProjectController),
            UIRoute('/app/projectview', ProjectView)
        )
    )
}
