<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductoAM;

class ProductoAMController extends Controller
{
    // muestra todos los productos
    public function index()
    {
        // obtener todos los productos de la base de datos
        $productos = ProductoAM::all();
        
        // retornar la vista con los productos
        return view('productos.index', compact('productos'));
    }

    // muestra el detalle de un producto
    public function show($id)
    {
        // buscar el producto por id
        $producto = ProductoAM::findOrFail($id);
        
        // retornar la vista con el producto
        return view('productos.show', compact('producto'));
    }
}
