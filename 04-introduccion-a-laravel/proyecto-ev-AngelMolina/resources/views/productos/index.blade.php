@extends('layouts.app')

@section('title', 'productos')

@section('content')
<h2>lista de productos</h2>

@if($productos->count() > 0)
    @foreach($productos as $producto)
        <div class="producto">
            <h3>{{ $producto->nombre }}</h3>
            <p>{{ $producto->descripcion }}</p>
            <p><strong>precio:</strong> ${{ $producto->precio }}</p>
            <p><strong>stock:</strong> {{ $producto->stock }}</p>
            <p><a href="{{ route('productos.show', $producto->id) }}">ver mas</a></p>
        </div>
    @endforeach
@else
    <p>no hay productos</p>
@endif
@endsection
