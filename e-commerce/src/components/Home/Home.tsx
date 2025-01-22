
import Category from '../Category/Category'
import Footer from '../Footer/Footer'
import Product from '../Product/Product'
import Hero from './Hero'

const Home = () => {
  return (
    <div className=' min-h-screen'>
        <Hero />
        <Category />
        <Product/>
        <Footer />
    </div>
  )
}

export default Home