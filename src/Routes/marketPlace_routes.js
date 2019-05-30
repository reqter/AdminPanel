import withResolver from '../hoc/withResolver'
import MarketPlace from '../Packages/MarketPlace'
import Products from '../Packages//MarketPlace-Products'

const routes = [
  {
    path: '/',
    component: MarketPlace,
    isPublic: true,
    routes: [
      {
        path: '/products',
        component: Products,
        isPublic: false
      }
    ]
  }
]
export default routes
