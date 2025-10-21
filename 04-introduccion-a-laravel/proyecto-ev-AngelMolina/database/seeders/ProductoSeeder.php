<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductoAM;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        ProductoAM::create([
            'nombre' => 'XRP',
            'descripcion' => 'Moneda digital utilizada para pagos globales rápidos y seguros en la red de RippleNet.',
            'precio' => 0.52,
            'stock' => 50000000000
        ]);

        ProductoAM::create([
            'nombre' => 'Bitcoin',
            'descripcion' => 'La primera criptomoneda descentralizada, funciona como oro digital y reserva de valor.',
            'precio' => 65420.75,
            'stock' => 19500000
        ]);

        ProductoAM::create([
            'nombre' => 'Ethereum',
            'descripcion' => 'Plataforma para contratos inteligentes y aplicaciones descentralizadas (dApps).',
            'precio' => 3550.40,
            'stock' => 120000000
        ]);

        ProductoAM::create([
            'nombre' => 'Cardano',
            'descripcion' => 'Blockchain de prueba de participación (PoS) enfocada en la sostenibilidad y la escalabilidad.',
            'precio' => 0.45,
            'stock' => 35000000000
        ]);

        ProductoAM::create([
            'nombre' => 'Solana',
            'descripcion' => 'Blockchain de alto rendimiento diseñada para aplicaciones y finanzas descentralizadas rápidas.',
            'precio' => 150.18,
            'stock' => 448000000
        ]);

        ProductoAM::create([
            'nombre' => 'Dogecoin',
            'descripcion' => 'Criptomoneda basada en un meme, popular para propinas y transacciones pequeñas.',
            'precio' => 0.15,
            'stock' => 140000000000
        ]);

        ProductoAM::create([
            'nombre' => 'Litecoin',
            'descripcion' => 'Una de las primeras criptomonedas, creada como una alternativa más rápida y ligera a Bitcoin.',
            'precio' => 85.30,
            'stock' => 74000000
        ]);
    }
}
