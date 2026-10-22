import App from "./App";
import { PostForm } from "./components/post/PostForm";
import { Dashboard } from "./pages/Dashboard";
import { EditPage } from "./pages/EditPage";
import { NotFound } from "./pages/NotFound";
import { SinglePost } from "./pages/SinglePost";


export const routes = [
    {
      path: "/",
      element : <App/>,
      children: [
        {index : true ,element : <Dashboard/> },
        {path : "posts/:postId",element : <SinglePost/> },
        {path : "form",element : <PostForm/> },
        {path : "form/:postId",element : <EditPage/> },
        {path : "*",element : <NotFound/> },
      ]
    }
  ]