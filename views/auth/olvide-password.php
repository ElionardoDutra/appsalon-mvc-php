<h1 class="nombre-pagina">Olvide password</h1>
<p class="descripcion-pagina">Restablece tu password escribiendo tu email a continuacion.</p>
<?php
    include_once __DIR__ . "/../templates/alertas.php";
?>
<form action="/olvide" class="formulario" method="POST">

    <div class="campo">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Ingresa tu email..">
    </div>
    <input type="submit" value="Enviar instrucciones" class="boton">
</form>

<div class="acciones">

    <a href="/"> Ya tienes una cuenta? Iniciar Sesion</a>

    <a href="/crear-cuenta"> No tienes una cuenta? Crear una</a>
</div>