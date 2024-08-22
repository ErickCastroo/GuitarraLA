import { useCarrito } from './Hooks/UseCarrito'

import { Header } from './Components/Header'
import { Guitarra } from './Components/Guitarras'

function Home() {
  const {
    guitarras,
    carrito,
    handleAddToCart,
    handleRemove,
    additemToCart,
    minItemToCart,
    clearCart,
    isEmpty,
    carritoTotal
  } = useCarrito()

  return (
    <>
      <Header
        carrito={carrito}
        handleRemove={handleRemove}
        additemToCart={additemToCart}
        minItemToCart={minItemToCart}
        clearCart={clearCart}
        isEmpty={isEmpty}
        carritoTotal={carritoTotal}
      />
      <main className='container-xl mt-5'>
        <h2 className='text-center'>Nuestra Colección</h2>
        <div className='row mt-5'>
          {guitarras.map((guitarra) => (
            <Guitarra
              key={guitarra.id}
              guitarra={guitarra}
              carrito={carrito}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>
      <footer className='bg-dark mt-5 py-5'>
        <div className='container-xl'></div>
      </footer>
    </>
  )
}

export { Home }