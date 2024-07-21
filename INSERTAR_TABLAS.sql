USE MITIENDA

INSERT INTO Rol(nombre) values
('Administrador'),
('Cliente')

GO
INSERT INTO Usuario(nombreCompleto,cedula,correo,idRol,clave) values 
('cliente 1',' 0987654321','cliente1@example.com',2,'123'),
('Admin 1','0999999999','admin1@vm.com',1,'123')

GO

INSERT INTO Categoria(nombre,estado) values
('Laptops',1),
('Monitores',1),
('Teclados',1)


GO

INSERT INTO Producto(nombre,idCategoria,stock,precio,urlImagen, descripcion, estado) values
('laptop hp victus',1,40,2500,'https://www.computron.com.ec/wp-content/uploads/2023/05/16-D0510LA-3-768x768.jpg','Laptop HP Victus 16.1" color gris oscuro 16GB de Ram - 512GB SSD - Intel Ci7', 1),
('laptop lenovo ideapad',1,30,1200,'https://www.computron.com.ec/wp-content/uploads/2023/11/81WE01Q6LM-768x768.jpg','Laptop IdeaPad 3 15.6" color gris platinado 8GB de Ram - 256GB SSD - Intel Core i5', 1),
('laptop hp',1,30,1100,'https://www.computron.com.ec/wp-content/uploads/2024/02/14-DQ5012LA-768x768.jpg','Laptop HP 3 14" color gris platinado claro 8GB de Ram - 512GB SSD - Intel Ci3',1),
('monitor lg',2,25, 400,'https://www.computron.com.ec/wp-content/uploads/2024/02/27MP60G-B-768x768.jpg','Monitor LG 27" color negro conn rojo LED FLAT - IPS 1080p',1),
('monitor samsung',2,15,500,'https://www.computron.com.ec/wp-content/uploads/2023/06/LF24T350FHNX-768x768.jpg','Monitor Samsung 24" color negro LED FLAT - IPS 1080p',1),
('monitor asus',2,15,620,'https://www.computron.com.ec/wp-content/uploads/2023/03/VY249HE-2-768x768.jpg','Monitor Samsung 23.8" color negro  LED FLAT - IPS full HD',1),
('teclado logitech',3,15,60,'https://www.computron.com.ec/wp-content/uploads/2024/04/920-007123-768x768.jpg','Teclado Logitech Inalambrico k400 color negro - Touchpad',1),
('teclado klip',3,15,20,'https://www.computron.com.ec/wp-content/uploads/2024/04/KKS-050S-2-768x768.jpg','Teclado Klip Extreme Alámbrico color negro - USB',1)

GO

INSERT INTO Menu(nombre,url) values
('Inicio','/pages/inicio'),--inicio?
('Productos','/pages/productos'),
('Carrito','/pages/carrito'),
('Perfil','/pages/productos'),
('Usuarios','/pages/usuarios'),
('Historial','/pages/historial'),
('Reportes','/pages/reportes')--borrar reportes

GO

INSERT INTO MenuRol(idMenu,idRol) values
(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(7,1)

GO

INSERT INTO MenuRol(idMenu,idRol) values
(1,2),
(2,2),
(3,2),
(4,2)


GO

INSERT INTO numerodocumento(ultimoNumero,fechaRegistro) values
(0,getdate())

