import { languageManager } from './services'

import Login from './Packages/Login'
import Signup from './Packages/Signup'
import ForgotPassword from './Packages/ForgotPassword'
import Home from './Packages/Home'
import Categories from './Packages/Categories'
import ContentType from './Packages/ContentType'
import Users from './Packages/Users'
import Products from './Packages/Products'
import UpsertProduct from './Packages/UpsertProduct'
import Assets from './Packages/Assets'
import UploadFile from './Packages/upsertFile'
import Profile from './Packages/Profile'
import Settings from './Packages/Settings'
import UpsertUser from "./Packages/upsertUser";

function translate (key) {
  return languageManager.translate(key)
}

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
        name: translate('HOME_SIDE_NAV_CONTENT_TYPE'),
        icon: 'item-type',
        path: '/panel/contentType',
        desc: translate('HOME_SIDE_NAV_CONTENT_TYPE_DEC'),
        component: ContentType,
        isPublic: false
      },
      {
        name: translate('HOME_SIDE_NAV_CATEGRIES'),
        icon: 'category',
        path: '/panel/categories',
        desc: translate('HOME_SIDE_NAV_CATEGORIES_DEC'),
        component: Categories,
        isPublic: false
      },
      {
        name: translate('HOME_SIDE_NAV_PRODUCTS'),
        icon: 'product',
        path: '/panel/contents',
        desc: translate('HOME_SIDE_NAV_PRODUCTS_DESC'),
        component: Products,
        isPublic: false
      },
      {
        name: translate('HOME_SIDE_NAV_MANAGET_USERS'),
        icon: 'users',
        path: '/panel/users',
        desc: translate('HOME_SIDE_NAV_MANAGE_USERS_DESC'),
        component: Users,
        isPublic: false
      },
      {
        name: translate('HOME_SIDE_NAV_ASSETS_MANAGER'),
        icon: 'images',
        desc: translate('HOME_SIDE_NAV_ASSETS_MANAGER_DESC'),
        path: '/panel/assets',
        component: Assets,
        isPublic: false
      },
      {
        name: translate('HOME_SIDE_NAV_PROFILE'),
        icon: 'user',
        desc: translate('HOME_SIDE_NAV_PROFILE_DESC'),
        path: '/panel/profile',
        component: Profile,
        isPublic: false
      },
      {
        name: translate('HOME_SIDE_NAV_SETTINGS'),
        icon: 'cog',
        desc: translate('HOME_SIDE_NAV_SETTINGS_DESC'),
        path: '/panel/settings',
        component: Settings,
        isPublic: false
      }
    ]
  },
  {
    path: '/contents/new',
    component: UpsertProduct,
    isPublic: false
  },
  {
    path: '/contents/edit/:id',
    component: UpsertProduct,
    isPublic: false
  },
  {
    path: '/contents/view/:id',
    component: UpsertProduct,
    isPublic: false
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
    component: UploadFile,
    isPublic: false
  },
  {
    path: '/editAsset/:id',
    component: UploadFile,
    isPublic: true
  }
]
export default routes
