<?php

namespace Model;

class AdminCita extends ActiveRecord
{

    //Base de datos
    protected static $tabla = 'citasServicios';
    protected static $columnasDB = ['id', 'cliente', 'telefono', 'email', 'hora', 'servicio', 'precio'];

    public $id;
    public $cliente;
    public $telefono;
    public $email;
    public $hora;
    public $servicio;
    public $precio;


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->cliente = $args['cliente'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->hora = $args['hora'] ?? '';
        $this->servicio = $args['servicio'] ?? '';
        $this->precio = $args['precio'] ?? '';

    }
    
}