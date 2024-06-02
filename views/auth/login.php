<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Iniciar sesion con tus datos</p>

<?php
    include_once __DIR__ . "/../templates/alertas.php";
?>
<form action="/" class="formulario" method="POST">
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Ingresa tu email..">
    </div>
    <div class="campo">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Ingresa tu password..">
    </div>

    <input type="submit" value="Iniciar Sesion" class="boton">
</form>

<div class="acciones">

    <a href="/crear-cuenta"> No tienes una cuenta? Crear una</a>
    <a href="/olvide"> Recuperar contraseña?</a>
</div>