<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
    <style>
        body {
            font-family: Arial;
            margin: 20px;
        }
        h1 {
            color: #333;
        }
        a {
            color: blue;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .producto {
            border: 1px solid #ccc;
            padding: 10px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h1>tienda de productos</h1>
    <p><a href="{{ route('productos.index') }}">ver todos los productos</a></p>
    <hr>
    
    @yield('content')
    
    <hr>
    <p>angel molina - 2025</p>
</body>
</html>
