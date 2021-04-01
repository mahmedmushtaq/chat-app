import "./App.scss";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Chat, Login, Register, ProtectedRoute } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSmile, faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faSmile,
  faImage,
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route render={() => <h2>404 page is not found</h2>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
