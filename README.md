# My Odin Project blog — admin portal

The writing and publishing side of my **Blog API** project: a React app where the blog's administrator creates, edits, publishes and deletes posts, and moderates readers' comments.

Built as part of [The Odin Project](https://www.theodinproject.com/) — Full Stack JavaScript path. The project is split in three parts:

- **Blog API** — REST API (Express 5, Prisma, PostgreSQL, JWT auth) — [repo](https://github.com/Aurel-Charles/Project-Blog-API-SERVER-TOP)
- **Reader client** — the public blog — [repo](https://github.com/Aurel-Charles/Project-Blog-API-CLIENT-TOP) · [live](https://project-blog-api-client-top.netlify.app)
- **Admin portal** — this repo

## Live demo

[Open the admin portal](https://project-blog-api-admin-top.netlify.app)

Access is restricted to the administrator account. Any other account gets a clear message and a link back to the blog.

## Features

- **Admin-only access**
  - log in with email and password (JWT stored in `localStorage`)
  - the role is checked with `/auth/me`: a non-admin account is logged out right away and sees *"This is an administrator only page"*
  - an expired token (401) logs the admin out automatically
  - while the session is being checked, the header stays visible with a loader below it
- **Dashboard**
  - every post, drafts included, newest first
  - a status badge (Draft / Published) and the relevant dates (published, or created and last updated)
  - publish / unpublish, edit, view and delete directly from each row
  - errors are shown on the row they belong to
- **Post page**
  - the post as readers will see it, with the same actions as the dashboard (the HTML content is sanitized again with DOMPurify before being displayed)
  - comment moderation: read and delete any comment
- **Post form**
  - one component for both creating and editing (empty or pre-filled)
  - a **rich text editor** (TinyMCE, self-hosted) whose toolbar only offers what the API accepts: paragraphs, `h2` / `h3` headings, bold, italic, lists, quotes, links and code blocks
  - validation errors from the API shown under the matching field
  - after saving, redirects to the post page
- **Feedback on slow requests**
  - buttons are disabled and show a spinner (*Logging in…*, *Saving…*, *Deleting…*) while the API answers, so nothing is sent twice
- **Confirmation before deleting**, with a reusable `ConfirmDialog` built on the native `<dialog>` element (backdrop, Escape key, focus handled by the browser)
- 404 page, responsive layout, visible keyboard focus, accessible labels on icon-only buttons

## Tech stack

- **React 19** + **Vite**
- **React Router** (data mode: `createBrowserRouter`, layout route with `Outlet`)
- **CSS Modules** with global design tokens (CSS custom properties)
- **TinyMCE** (`tinymce` + `@tinymce/tinymce-react`), self-hosted under the GPL licence: no account or API key
- **DOMPurify** to sanitize post HTML before rendering it
- **Lucide React** for icons
- Fonts: **Newsreader** (reading) and **Fira Sans** (interface), from Google Fonts

## Getting started

```bash
git clone git@github.com:Aurel-Charles/Project-Blog-API-ADMIN-TOP.git
cd Project-Blog-API-ADMIN-TOP
npm install            # also copies TinyMCE into public/tinymce (postinstall script)
cp .env.example .env   # then set the two URLs
npm run dev
```

### TinyMCE

TinyMCE is installed with npm and served by the site itself. A `postinstall` script (`postinstall.js`) copies `node_modules/tinymce` into `public/tinymce` after every `npm install`, including on Netlify during the build. The editor loads it with `tinymceScriptSrc="/tinymce/tinymce.min.js"` and `licenseKey="gpl"`.

`public/tinymce/` is generated, so it is listed in `.gitignore`.

The admin account is created by the API's seed script — there is no admin sign-up.

### Environment variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the Blog API, without a trailing slash (e.g. `http://localhost:3000`) |
| `VITE_BLOG_URL` | URL of the public blog, used for the "View Blog" links |

Vite inlines these values at build time, so on Netlify they must be set in the site's environment variables **before** building (and the site redeployed after any change).

## Project structure

```
src/
├── main.jsx              router setup
├── routes.jsx            layout route + pages
├── App.jsx               auth state (token + user), role check, layout
├── api/api.js            apiFetch(): base URL, JSON, Bearer token, errors
├── components/
│   ├── Header, Footer, Loader, FieldErrors, ConfirmDialog
│   ├── post/             DashboardPost, PostAction, PostDate, PostStatus, PostForm
│   └── comments/         Comments, SingleComment
├── pages/                Login, Dashboard, SinglePost, EditPage, NotFound
├── styles/               shared CSS Modules (page, article, form)
├── utils/                formatDate, truncate
└── index.css             design tokens, reset, base styles
```

### Routes

| Path | Page |
|---|---|
| `/` | Dashboard |
| `/posts/:postId` | Post page with comments |
| `/form` | New post |
| `/form/:postId` | Edit post (`EditPage` loads the post, then renders `PostForm`) |
| `*` | 404 |

There is no `/login` route: `App` shows the login screen instead of any page as long as there is no valid admin session, so after logging in you land on the URL you first asked for.

## API endpoints used

| Method | Endpoint | Used for |
|---|---|---|
| `POST` | `/auth/login` | log in |
| `GET` | `/auth/me` | current user and role check |
| `GET` | `/posts` | dashboard (drafts included for the admin) |
| `GET` | `/posts/:postId` | post page, edit form |
| `POST` | `/posts` | create a post (saved as a draft) |
| `PATCH` | `/posts/:postId` | edit, publish (`published: true`) or unpublish (`published: false`) |
| `DELETE` | `/posts/:postId` | delete a post and its comments |
| `GET` | `/posts/:postId/comments` | comments list |
| `DELETE` | `/posts/:postId/comments/:commentId` | delete a comment |

Every write route is protected on the server (`isAuth` → 401, `isAdmin` → 403). The role check in the front end is there for the user experience, not for security.

## Deployment

Deployed on **Netlify**:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: `VITE_API_URL`, `VITE_BLOG_URL`

`public/_redirects` sends every route to `index.html`, so links like `/posts/3` work when opened directly or reloaded:

```
/*    /index.html   200
```

The API only accepts requests from known origins. Its `CORS_ORIGINS` variable on Render lists both Netlify sites plus `http://localhost:5173` and `http://localhost:5174` for local development — without a trailing slash.

## What I learned

- Planning the screens and user flow before writing any code
- Guarding every page from a single layout component instead of repeating checks on each page
- Checking a user's role after login, and why a front-end check is UX, not security
- Writing one form for two cases, driven by an optional `post` prop
- Splitting a page that loads data from a component that only displays it (`EditPage` / `PostForm`)
- Extracting shared components (`PostAction`, `PostDate`, `PostStatus`, `ConfirmDialog`) once a piece of UI is needed in two places
- Links vs buttons: navigation is a `Link`, an action is a `button`
- Opening a native `<dialog>` from React with `useRef`, `useEffect` and `showModal()`
- Adding a rich text editor, and matching its toolbar to what the server keeps
- Rendering HTML safely: sanitizing on the server **and** in the browser, then `dangerouslySetInnerHTML`
- Awaiting a parent's `async` function to show a pending state, with `finally` to reset it
- Restricting CORS to known origins
