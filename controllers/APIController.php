<?php
namespace Controllers;

use Model\CitaServicio;
use Model\Servicio;
use Model\Cita;

class APIController
{
    public static function index()
    {
        $servicios = Servicio::all();

        echo json_encode($servicios);
    }

    public static function guardar()
    {
        //Almacena la cita y devuelve el Id
        $cita = new Cita($_POST);
        $resultado = $cita->guardar();
        //Almacena la cita y los srvicios
        $id = $resultado['id'];
        $idServicios = explode(",", $_POST['servicios']);



        foreach ($idServicios as $idSevicio) {

            $args = [
                'citaId' => $id,
                'servicioId' => $idSevicio
            ];

            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }
        echo json_encode(['resultado' => $resultado]);
    }
    public static function eliminar()
    {
      if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $id = $_POST['id'];
       $cita= Cita::find($id);
       $cita->eliminar();
       header('Location:' . $_SERVER['HTTP_REFERER']);
      }
    }
}