import withResolver from './hoc/withResolver'

import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ForgotPassword from './Pages/ForgotPassword'
import MainPage from './Pages/MainPage'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import ContentTypes from './Pages/ContentTypes'
import Users from './Pages/Users'
import Forms from './Pages/Forms'
import UpsertContent from './Pages/UpsertContent'
import UpsertForm from './Pages/UpsertForm'
import Assets from './Pages/Assets'
import UpdateFile from './Pages/upsertFile'
import Profile from './Pages/Profile'
import Settings from './Pages/Settings'
import UpsertUser from './Pages/upsertUser'
import Requests from './Pages/Requests'
import Quotes from './Pages/Quotes'

const Main = withResolver(MainPage)
const AddAsset = withResolver(UpdateFile)
const EditAsset = withResolver(UpdateFile)
const AddContent = withResolver(UpsertContent)
const EditContent = withResolver(UpsertContent)
const ViewContent = withResolver(UpsertContent)
const AddForm = withResolver(UpsertForm)
const EditForm = withResolver(UpsertForm)
const ViewForm = withResolver(UpsertForm)

const routes = [
  {
    path: '/:lang/login',
    component: Login,
    isPublic: true
  },
  {
    path: '/:lang/signup',
    component: Signup,
    isPublic: true
  },
  {
    path: '/:lang/forgotPassword',
    component: ForgotPassword,
    isPublic: true
  },
  {
    path: '/:lang/contents/new',
    component: AddContent,
    isPublic: false
  },
  {
    path: '/:lang/contents/edit/:id',
    component: EditContent,
    isPublic: false
  },
  {
    path: '/:lang/contents/view/:id',
    component: ViewContent,
    isPublic: false
  },
  {
    path: '/:lang/form/new',
    component: AddForm,
    isPublic: false
  },
  {
    path: '/:lang/form/edit/:id',
    component: EditForm,
    isPublic: false
  },
  {
    path: '/:lang/form/view/:id',
    component: ViewForm,
    isPublic: false
  },
  // {
  //   path: '/:lang/requestContent/:id',
  //   component: ViewRequest,
  //   isPublic: true
  // },
  // {
  //   path: '/:lang/viewContent/:id',
  //   component: ContentView,
  //   isPublic: true
  // },
  {
    path: '/:lang/users/new',
    component: UpsertUser,
    isPublic: false
  },
  {
    path: '/:lang/users/edit/:id',
    component: UpsertUser,
    isPublic: false
  },
  {
    path: '/:lang/asset/new',
    component: AddAsset,
    isPublic: false
  },
  {
    path: '/:lang/asset/edit/:id',
    component: EditAsset,
    isPublic: true
  },
  {
    path: '/:lang/asset/view/:id',
    component: EditAsset,
    isPublic: true
  },
  {
    path: '/:lang',
    component: Main,
    isPublic: false,
    routes: [
      {
        name: 'HOME_SIDE_NAV_HOME',
        icon: 'home',
        path: '/:lang/home',
        desc: 'HOME_SIDE_NAV_HOME_DESC',
        component: Home,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_QUESTION_TYPES',
        icon: 'item-type',
        path: '/:lang/contentTypes',
        desc: 'HOME_SIDE_NAV_QUESTION_TYPES_DESC',
        component: ContentTypes,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_FORMS',
        icon: 'users',
        path: '/:lang/forms',
        desc: 'HOME_SIDE_NAV_FORMS_DESC',
        component: Forms,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_CATEGRIES',
        icon: 'category',
        path: '/:lang/categories',
        desc: 'HOME_SIDE_NAV_CATEGORIES_DEC',
        component: Categories,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_REQUESTS',
        icon: 'product',
        path: '/:lang/requests',
        desc: 'HOME_SIDE_NAV_REQUESTS_DESC',
        component: Requests,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_QUOTES',
        icon: 'product',
        path: '/:lang/quotes',
        desc: 'HOME_SIDE_NAV_QUOTES_DESC',
        component: Quotes,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_ASSETS_MANAGER',
        icon: 'images',
        desc: 'HOME_SIDE_NAV_ASSETS_MANAGER_DESC',
        path: '/:lang/assets',
        component: Assets,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_PROFILE',
        icon: 'user',
        desc: 'HOME_SIDE_NAV_PROFILE_DESC',
        path: '/:lang/profile',
        component: Profile,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_SETTINGS',
        icon: 'cog',
        desc: 'HOME_SIDE_NAV_SETTINGS_DESC',
        path: '/:lang/settings',
        component: Settings,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_MANAGET_USERS',
        icon: 'users',
        path: '/:lang/users',
        desc: 'HOME_SIDE_NAV_MANAGE_USERS_DESC',
        component: Users,
        isPublic: false
      }
    ]
  }
]
export default routes
