# POS Elli: Sistema de Punto de Venta (Restaurante 5 Estrellas)

## Descripción General del Sistema

**POS Elli** es una solución de punto de venta de alta fiabilidad diseñada específicamente para gestionar la operación integral (**pedidos, mesas y pagos**) de restaurantes de alta categoría. Su objetivo principal es garantizar una **operación eficiente y coordinada** entre el personal de servicio (salón), la cocina y la administración.

El sistema permite el registro de pedidos en **tiempo real**, la comunicación instantánea de órdenes a la cocina, el seguimiento del estado de preparación y la generación de cuentas finales para su cobro.

---

## 🍽️ Contexto Operacional

El sistema está diseñado para operar en un entorno donde se requiere la máxima **fluidez, confiabilidad y trazabilidad** de las transacciones.

### Flujo de Trabajo Clave:

* **Registro Flexible:** Cada mesa puede tener uno o más pedidos abiertos simultáneamente.
* **Toma de Órdenes:** Los meseros ingresan pedidos desde **tablets o terminales** de forma inmediata.
* **Gestión de Producción:** Los cocineros reciben y marcan el estado de los pedidos pendientes en tiempo real.
* **Cierre de Mesa:** El cajero o administrador gestiona el procesamiento y registro del pago final.

---

## 🎯 Objetivos Principales

La implementación de POS Elli se centra en:

* **Reducción de Errores:** Minimizar fallos y confusiones durante la toma de pedidos y su transmisión a la cocina.
* **Optimización de Tiempos:** Acelerar la comunicación entre el salón y la cocina para mejorar los tiempos de servicio.
* **Trazabilidad Completa:** Mantener un registro detallado de cada pedido, desde su creación hasta su cobro final.
* **Soporte Administrativo:** Facilitar el control básico y la toma de decisiones mediante la provisión de estadísticas (ej. ventas diarias, productos más pedidos).

---

# 🚀 Instalación y Puesta en Marcha

Esta guía explica cómo levantar **POS Elli** desde cero en cualquier máquina usando **Docker + Docker Compose**.  
Incluye pasos para iniciar servicios, correr migraciones, ejecutar seeders y acceder a la aplicación.

---

## 📦 Requisitos Previos

Antes de comenzar, asegurate de tener instalado:

- **Docker** (v20+)
- **Docker Compose** (v2+)
- **Git** (opcional)

---

## 📁 Clonar el Repositorio

```bash
git clone https://github.com/BrianFloresOk/ELLI-Restaurant.git
cd ELLI-Restaurant
```

# ⚙️ Configuración de Variables de Entorno

El sistema utiliza archivos `.env` para backend y frontend.

---

## Backend

Crear archivo en: apps/backend/.env
Ejemplo:

```env
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=resto_elli_db
PORT=3500
JWT_SECRET=supersecreto123
```


## Frontend

Crear archivo en: apps/backend/.env
Ejemplo: VITE_API_URL=http://localhost:3500/api/v1

---

## Levantar Docker

En la raiz del proyecto ejecutar

```bash
docker compose up --build
```

Esto iniciará:

 - PostgreSQL
 - Backend (Node + TypeORM)
 - Frontend (React + Vite)

---


## Ejecturar migraciones y seeders

Entrar al contenedor del backend y ejecutar

Ejecutar migraciones
```bash
yarn migration:run
```

Ejecutar seeders
```bash
yarn db:seed
```

## Acceder a la Aplicación
Frontend POS

```bash
👉 http://localhost:5173/
```


Backend API

```bash
👉 http://localhost:3500/api/v1
```
Base de Datos

Host: localhost

Port: 5432

Usuario/contraseña definidos en .env

## Comandos Útiles
Detener contenedores

```bash
docker compose down
```

Ver logs
```bash
docker logs -f elli_backend
docker logs -f elli_frontend
docker logs -f elli_postgres
```

Reconstruir desde cero
```bash
docker compose down -v
docker compose up --build
```


## Primer ingreso

Para ingresar podes hacerlo con las siguientes credenciales en el Login

email: admin@elli.com

password: admin123
