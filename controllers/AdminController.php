<?php

namespace Controllers;

use Model\AdminCita;
use MVC\Router;

class AdminController
{
    public static function index(Router $router)
    {
        session_start();
        isAuth();
        isAdmin();
        //Trabajar con las fecha 
        $fecha= $_GET['fecha'] ?? date("Y-m-d");//si no la obtiene genera la del servidor
        $fechas= explode('-',$fecha);
        if(!checkdate($fechas[1],$fechas[2],$fechas[0])){
            header('Location: /404');
        }

        //consultar la BD
        $consulta = " SELECT appsalon_mvc.citas.id,concat(appsalon_mvc.usuarios.nombre, ' ', appsalon_mvc.usuarios.apellido) as 'cliente', ";
        $consulta .= " appsalon_mvc.usuarios.telefono ,appsalon_mvc.usuarios.email,appsalon_mvc.citas.hora,appsalon_mvc.servicios.nombre as 'servicio', appsalon_mvc.servicios.precio ";
        $consulta .= " FROM appsalon_mvc.citas  ";
        $consulta .= " LEFT OUTER JOIN appsalon_mvc.usuarios ";
        $consulta .= " ON appsalon_mvc.citas.usuarioId=appsalon_mvc.usuarios.id  ";
        $consulta .= " LEFT OUTER JOIN appsalon_mvc.citasServicios ";
        $consulta .= " ON appsalon_mvc.citasServicios.citaId=appsalon_mvc.citas.id ";
        $consulta .= " LEFT OUTER JOIN appsalon_mvc.servicios ";
        $consulta .= " ON appsalon_mvc.servicios.id=appsalon_mvc.citasServicios.servicioId ";
        $consulta .= " WHERE fecha =  '${fecha}' ";

        $citas= AdminCita ::SQL($consulta);
             //debuguear($citas);

        $router->render(
            'admin/index',
            [
                'nombre' => $_SESSION['nombre'],
                'citas'=>$citas,
                'fecha'=>$fecha

            ]
        );

    }
}