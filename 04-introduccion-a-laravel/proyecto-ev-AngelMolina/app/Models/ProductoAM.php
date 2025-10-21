<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductoAM extends Model
{
    // nombre de la tabla
    protected $table = 'productos';

    // campos que se pueden asignar masivamente
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock'
    ];
}
