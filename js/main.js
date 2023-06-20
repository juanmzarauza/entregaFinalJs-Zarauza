
const verProductos = async () => {
    const res = await fetch("./js/productos.json")
    const productos = await res.json()
    console.log(productos)
    productos.forEach(productos => {
        if(productos.stock != 0){
        verProducto(productos)
        agregarCarrito(productos.id)
    }
    })
}

verProductos()

const carrito = JSON.parse(localStorage.getItem("carrito")) ?? []
const verProducto = ({nombre,precio,descripción,stock,urlImg,id}) =>{
    const contenedorTarjetas = document.querySelector("#contenedorTarjetas")
    const tarjeta = document.createElement("div")
    tarjeta.className = "tarjeta"
    tarjeta.innerHTML = `
                        <img src="${urlImg}" alt="">
                        <h3 class="contenido">
                        <div>${nombre}</div>
                        <p>${descripción}</p>
                        <span><b>Precio:</b><b>${precio}</b>$</span>
                        </h3>
                        <form id=formCarrito${id}>
                        <input name="id" type="hidden" value="${id}"></input>
                        <input name="cantidad" type="numer" value="1" min="1" max="${stock}"></input>
                        <button id=btn type="submit"><b>Agregar al carrito</b></button>
                        </form>
                        `
    contenedorTarjetas.append(tarjeta)
}

let cantidadTotal = 0

const agregarCarrito = (id) => {
    const formCarrito = document.querySelector("#formCarrito" + id)
    formCarrito.addEventListener("submit", (e) => {
        e.preventDefault()
        const cantidad =parseInt(e.target.children.cantidad["value"])  
        carrito.push({
            id,
            cantidad,
        }) 
        cantidadTotal = cantidadTotal + cantidad
        const numeroCarrito = document.querySelector("#numeroCarrito")
        numeroCarrito.innerText= cantidadTotal
        console.log(cantidadTotal)

        localStorage.setItem("carrito", JSON.stringify(carrito))
        Swal.fire({
            imageUrl: "https://i.ibb.co/YNmM1WZ/some-delicious-pork-bondiola-fetas-260nw-2101389478.webp",
            imageHeight: 250,
            title: 'usted acaba de comprar',
            text: '',
            footer: '<a href=""></a>',
            color:"red",
            background: "linear-gradient(red, yellow)", 
         })

    })
}
