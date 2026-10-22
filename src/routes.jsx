import App from "./App";
import { Dashboard } from "./pages/Dashboard";
import { SinglePost } from "./pages/SinglePost";


export const routes = [
    {
      path: "/",
      element : <App/>,
      children: [
        {index : true ,element : <Dashboard/> },
        {path : "posts/:postId",element : <SinglePost/> },
        {path : "form",element : <p>formulaire creation </p> },
        {path : "form/:postId",element : <p>formulaire modification </p> },
        {path : "*",element : <p>page error</p> },
      ]
    }
  ]