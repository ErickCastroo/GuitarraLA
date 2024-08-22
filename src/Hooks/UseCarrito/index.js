import { useState, useEffect, useMemo} from 'react'

import { db } from '../../Data/Db/Data'

const useCarrito = () => {
  const initialCarrito = () => {
    const localStorageCarrito = localStorage.getItem('carrito')
    return localStorageCarrito ? JSON.parse(localStorageCarrito) : []
  }

  const [guitarras, setGuitarras] = useState([])
  const [carrito, setCarrito] = useState(initialCarrito)

  const maxItems = 10
  const minItems = 1

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  useEffect(() => {
    setGuitarras(db)
  }, [])

  const handleAddToCart = (item) => {
    const itemExist = carrito.findIndex((guitarra) => guitarra.id === item.id)
    if (itemExist >= 0) {
      if (carrito[itemExist].cantidad >= maxItems) return
      const updateCarrito = [...carrito]
      updateCarrito[itemExist].cantidad++
      setCarrito(updateCarrito)
    } else {
      item.cantidad = 1
      setCarrito([...carrito, item])
    }
  }

  const handleRemove = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((guitarra) => guitarra.id !== id)
    )
  }

  const additemToCart = (id) => {
    const ActualizarCarrito = carrito.map((item) => {
      if (item.id === id && item.cantidad < maxItems) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
        }
      }
      return item
    })
    setCarrito(ActualizarCarrito)
  }

  const minItemToCart = (id) => {
    const Actualizarcart = carrito.map((item) => {
      if (item.id === id && item.cantidad > minItems) {
        return {
          ...item,
          cantidad: item.cantidad - 1,
        }
      }
      return item
    })
    setCarrito(Actualizarcart)
  }

  const clearCart = () => {
    setCarrito([])
  }

    //state derivado
    const isEmpty = useMemo(() => carrito.length === 0, [carrito])
    const carritoTotal = useMemo(
      () =>
        carrito.reduce((total, item) => total + item.cantidad * item.price, 0),
      [carrito]
    )

  return {
    guitarras,
    carrito,
    handleAddToCart,
    handleRemove,
    additemToCart,
    minItemToCart,
    clearCart,
    isEmpty,
    carritoTotal,
  }
}

export { useCarrito }
