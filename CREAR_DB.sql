create database MITIENDA

GO

use MITIENDA




CREATE TABLE Rol(
idRol				INT PRIMARY KEY NOT NULL IDENTITY(1,1),
nombre				VARCHAR(50),
fechaRegistro		DATETIME DEFAULT GETDATE()
)

GO

CREATE TABLE Usuario(
idUsuario			INT PRIMARY KEY NOT NULL IDENTITY(1,1),
nombreCompleto		VARCHAR(100),
cedula              VARCHAR(20) UNIQUE, 
correo				VARCHAR(80) UNIQUE,
idRol				INT REFERENCES Rol(idRol),
clave				VARCHAR(40),
estado			    BIT DEFAULT 1,
fechaRegistro		DATETIME DEFAULT GETDATE()
)

GO


CREATE TABLE Categoria(
idCategoria			INT PRIMARY KEY NOT NULL IDENTITY(1,1),
nombre				VARCHAR(50),
estado			    BIT DEFAULT 1,
fechaRegistro		DATETIME DEFAULT GETDATE()
)

GO

CREATE TABLE Producto (
idProducto			INT PRIMARY KEY NOT NULL IDENTITY(1,1),
nombre				VARCHAR(40),
idCategoria			INT REFERENCES Categoria(idCategoria),
stock				INT,
precio				DECIMAL(10,2),
urlImagen           VARCHAR(512),
descripcion         VARCHAR(300),
estado			    BIT DEFAULT 1,
fechaRegistro		DATETIME DEFAULT GETDATE()
)

GO


CREATE TABLE Menu(
idMenu				INT PRIMARY KEY NOT NULL IDENTITY(1,1),
nombre				VARCHAR(50),
url					VARCHAR(50)
)

GO

CREATE TABLE MenuRol(
idMenuRol			INT PRIMARY KEY NOT NULL IDENTITY(1,1),
idMenu				INT REFERENCES Menu(idMenu),
idRol				INT REFERENCES Rol(idRol)
)

GO


CREATE TABLE NumeroDocumento(
idNumeroDocumento	INT PRIMARY KEY NOT NULL IDENTITY(1,1),
ultimoNumero		INT NOT NULL,
fechaRegistro		DATETIME DEFAULT GETDATE()
)
GO

CREATE TABLE Factura(
idFactura			INT PRIMARY KEY NOT NULL IDENTITY(1,1),
numeroDocumento		VARCHAR(40),
tipoPago			VARCHAR(50),
total				DECIMAL(10,2),
idUsuario           INT REFERENCES Usuario(idUsuario),
cedula              VARCHAR (20) REFERENCES Usuario(cedula),
fechaRegistro		DATETIME DEFAULT GETDATE()

)
GO

CREATE TABLE DetalleFactura(
idDetalleFactura	INT PRIMARY KEY NOT NULL IDENTITY(1,1),
idFactura			INT REFERENCES Factura(idFactura),
idProducto			INT REFERENCES Producto(idProducto),
cantidad			INT,
precio				DECIMAL(10,2),
total				DECIMAL(10,2)
)

GO




--ALTER AUTHORIZATION ON DATABASE::MITIENDA TO sa;