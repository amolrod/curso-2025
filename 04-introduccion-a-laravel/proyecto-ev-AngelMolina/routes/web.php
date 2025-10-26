<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoAMController;

// ruta principal redirige al catalogo de productos
Route::get('/', function () {
    return redirect()->route('productos.index');
});

// rutas para productos
Route::get('/productos', [ProductoAMController::class, 'index'])->name('productos.index');
Route::get('/productos/{id}', [ProductoAMController::class, 'show'])->name('productos.show');

