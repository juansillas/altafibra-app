import {useState, useEffect, createContext} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';


const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState([]);
    const [producto, setProducto] = useState([]);
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);

    const obtenerCategorias = async () => {
        //acceder a los datos de categorias
        const {data} = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() =>{
        setCategoriaActual(categorias[0])
    }, [categorias])

    const handleClickCategoria = id => {
        const categoria = categorias.filter ( cat => cat.id === id)
        setCategoriaActual(categoria[0]);
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    //hacer destructuring, retirar categoriaId e imagen para crear un nuevo objeto producto sin éstos valores 
    const handleAgregarPedido = ({categoriaId, imagen, ...producto}) => {
        //Some solo regresa true o false
        if(pedido.some(productoState => productoState.id === producto.id)) {
            //console.log('El producto ya existe')
            //Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === 
                producto.id ? producto : productoState)
                setPedido(pedidoActualizado)

            toast.success('Guardado correctamente');    
        }else{
            //console.log('El producto no existe')
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }

        setModal(false);
        
    }

    return(
        <QuioscoContext.Provider
        value={{
            categorias, 
            categoriaActual, 
            handleClickCategoria,
            producto, 
            handleSetProducto,
            modal,
            handleChangeModal,
            handleAgregarPedido,
            pedido
        }}
        >

            {children}
            
        </QuioscoContext.Provider>
    )
}

export{
    QuioscoProvider
}

export default QuioscoContext;