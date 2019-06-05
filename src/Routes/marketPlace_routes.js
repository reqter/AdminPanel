import withResolver from '../hoc/withResolver'
import Products from '../Packages/MarketPlace-Products'
import NewRequest from '../Packages/MarketPlace-UpsertReq'

const routes = [
  {
    path: '/market/:categoryId?',
    component: Products,
    isPublic: true,
  },
  {
    path: '/newRequest/:id',
    component: NewRequest,
    isPublic: true
  }
]
export default routes
