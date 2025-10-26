@extends('layouts.app')

@section('title', 'detalle producto')

@section('content')
<h2>{{ $producto->nombre }}</h2>

<p>{{ $producto->descripcion }}</p>

<p><strong>precio:</strong> ${{ $producto->precio }}</p>

<p><strong>stock:</strong> {{ $producto->stock }} unidades</p>

@if($producto->stock > 0)
    <p>disponible</p>
@else
    <p>agotado</p>
@endif

<p><a href="{{ route('productos.index') }}">volver</a></p>
@endsection
