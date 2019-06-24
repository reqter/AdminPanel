

import withResolver from './hoc/withResolver'

import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ForgotPassword from './Pages/ForgotPassword'
import HomeComponent from './Pages/Home'
import Categories from './Pages/Categories'
import ContentType from './Pages/ContentType'
import Users from './Pages/Users'
import Requests from './Pages/Requests'
import Contents from './Pages/Contents'
import UpsertContent from './Pages/UpsertContent'
import Assets from './Pages/Assets'
import UpdateFile from './Pages/upsertFile'
import Profile from './Pages/Profile'
import Settings from './Pages/Settings'
import UpsertUser from './Pages/upsertUser'
import ContentView from './Pages/ViewContent'
import ViewRequest from './Pages/ViewRequest'

const Home = withResolver(HomeComponent)
const AddAsset = withResolver(UpdateFile)
const EditAsset = withResolver(UpdateFile)
const AddContent = withResolver(UpsertContent)
const EditContent = withResolver(UpsertContent)
const ViewContent = withResolver(UpsertContent)

const routes = [
  {
    path: '/login',
    component: Login,
    isPublic: true
  },
  {
    path: '/signup',
    component: Signup,
    isPublic: true
  },
  {
    path: '/forgotPassword',
    component: ForgotPassword,
    isPublic: true
  },
  {
    path: '/panel',
    component: Home,
    isPublic: false,
    routes: [
      {
        name: 'HOME_SIDE_NAV_CONTENT_TYPE',
        icon: 'item-type',
        path: '/panel/contentType',
        desc: 'HOME_SIDE_NAV_CONTENT_TYPE_DEC',
        component: ContentType,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_CATEGRIES',
        icon: 'category',
        path: '/panel/categories',
        desc: 'HOME_SIDE_NAV_CATEGORIES_DEC',
        component: Categories,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_PRODUCTS',
        icon: 'product',
        path: '/panel/contents',
        desc: 'HOME_SIDE_NAV_PRODUCTS_DESC',
        component: Contents,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_REQUESTS',
        icon: 'users',
        path: '/panel/requests',
        desc: 'HOME_SIDE_NAV_REQUESTS_DESC',
        component: Requests,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_ASSETS_MANAGER',
        icon: 'images',
        desc: 'HOME_SIDE_NAV_ASSETS_MANAGER_DESC',
        path: '/panel/assets',
        component: Assets,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_PROFILE',
        icon: 'user',
        desc: 'HOME_SIDE_NAV_PROFILE_DESC',
        path: '/panel/profile',
        component: Profile,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_SETTINGS',
        icon: 'cog',
        desc: 'HOME_SIDE_NAV_SETTINGS_DESC',
        path: '/panel/settings',
        component: Settings,
        isPublic: false
      },
      {
        name: 'HOME_SIDE_NAV_MANAGET_USERS',
        icon: 'users',
        path: '/panel/users',
        desc: 'HOME_SIDE_NAV_MANAGE_USERS_DESC',
        component: Users,
        isPublic: false
      }
    ]
  },
  {
    path: '/contents/new',
    component: AddContent,
    isPublic: false
  },
  {
    path: '/contents/edit/:id',
    component: EditContent,
    isPublic: false
  },
  {
    path: '/contents/view/:id',
    component: ViewContent,
    isPublic: false
  },
  {
    path: '/requests/new',
    component: AddContent,
    isPublic: false
  },
  {
    path: '/requests/edit/:id',
    component: EditContent,
    isPublic: false
  },
  {
    path: '/requests/view/:id',
    component: ViewContent,
    isPublic: false
  },
  {
    path: '/requestContent/:id',
    component: ViewRequest,
    isPublic: true
  },
  {
    path: '/viewContent/:id',
    component: ContentView,
    isPublic: true
  },
  {
    path: '/users/new',
    component: UpsertUser,
    isPublic: false
  },
  {
    path: '/users/edit/:id',
    component: UpsertUser,
    isPublic: false
  },
  {
    path: '/addAsset',
    component: AddAsset,
    isPublic: false
  },
  {
    path: '/editAsset/:id',
    component: EditAsset,
    isPublic: true
  }
]
export default routes
