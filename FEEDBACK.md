# Feedback del Trabajo Práctico

## Integrantes

Según el padrón, el equipo está integrado por dos personas:

- **Cristian Monzón** (`ivanm93` — cristianmonzon91@gmail.com) — realizó la totalidad del trabajo.
- **Alan Valdez** — no registra commits en el repositorio.

> En la práctica, todo el desarrollo lo sostuvo Monzón. Teniendo eso en cuenta, el alcance logrado es muy destacable. 👏

---

## Resumen General

¡Muy buen trabajo! 🎉 Aunque todo el desarrollo lo sostuvo un solo integrante (Monzón), cubre prácticamente todo el MVP de `ENUNCIADO.md`: las cinco entidades con sus relaciones, el CRUD de cada una, la regla de negocio de los comentarios **configurable por variable de entorno**, documentación con Swagger y colección de Postman, migraciones, y hasta el **bonus de seguidores**.

La arquitectura está muy ordenada (config / controllers / models / middlewares / routes) y reutilizan un **middleware de validación genérico** en todas las rutas, que es una de las cosas que la materia valora. Hay dos puntos a completar —la unicidad de `nickName` y la asociación de etiquetas a un post— que son acotados y concretos.

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capas claras + middleware de validación genérico. |
| Modelado        |   ⚠️   | Relaciones completas, pero falta `unique` en `nickName` (Obs. 1). |
| Validaciones    |   ✅   | Joi por entidad con mensajes personalizados. |
| Middlewares     |   ✅   | `validate(schema)` genérico, reutilizado en todas las rutas. |
| API REST        |   ⚠️   | CRUD completo; falta endpoint para asociar tags a un post (Obs. 2). |
| Configuración   |   ✅   | Puerto y ventana de meses configurables por `.env`. |
| Documentación   |   ✅   | Swagger (`/api-docs`), Postman, DER y migraciones. |

---

## Fortalezas

### 1. Regla de comentarios antiguos, configurable por entorno ⏳
**Ubicación:** `src/controllers/post.controller.js` (`getAll`, `getById`)

Al traer los posts, los comentarios se filtran por antigüedad usando el valor del entorno:

```js
const months = process.env.COMMENT_VISIBLE_MONTHS || 6;
const limitDate = new Date();
limitDate.setMonth(limitDate.getMonth() - months);
// include: [{ model: Comment, where: { createdAt: { [Op.gte]: limitDate } }, required: false }]
```

Es justo lo que pide el enunciado: el umbral es configurable y el filtro se aplica **solo en la visualización de los posts**. Muy bien resuelto. 👌

### 2. Middleware de validación genérico ♻️
**Ubicación:** `src/middlewares/validation.middleware.js`

`validate(schema)` recibe un schema de Joi y devuelve un middleware reutilizable, que aplican de forma consistente en `user.routes`, `post.routes`, `tag.routes` e `image.routes`. Centralizar la validación así evita repetir código y es el patrón que se busca en la materia.

### 3. Arquitectura ordenada y CRUD consistente 🏗️
**Ubicación:** `src/controllers/`, `src/routes/`

Cada entidad tiene su controlador y sus rutas, con un manejo de errores **consistente**: cuando un recurso no existe, responden `404` con un mensaje claro (ver `getById`/`update`/`remove`). Los códigos HTTP son adecuados (201 al crear, 404 cuando corresponde).

### 4. Documentación y material de prueba completos 📚
**Ubicación:** `docs/swagger.yaml`, `Unahur Anti-social Net.postman_collection.json`, `migrations/`, `DER.png`

Incluyeron Swagger servido en `/api-docs`, una colección de Postman, el DER y migraciones con `sequelize-cli`. Es una cobertura de documentación muy buena, más aún habiéndola sostenido una sola persona.

### 5. Modelado de relaciones y bonus de seguidores 🔗
**Ubicación:** `src/models/user.js`, `src/models/follow.js`

Definieron correctamente 1:N (User→Post, User→Comment, Post→Comment, Post→PostImage) y la relación reflexiva de **seguidores** (`User.belongsToMany(User, { through: Follow, as: 'Followers'/'Following' })`), con su controlador y rutas para seguir/dejar de seguir.

---

## Observaciones

### 1. El campo `nickName` no está definido como único

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/models/user.js` y `migrations/20260516224814-create-user.js`

**Descripción:**
El enunciado indica explícitamente que `nickName` **debe ser único** y funcionar como identificador principal del usuario. Hoy está declarado como un string común, tanto en el modelo como en la migración:

```js
// modelo
nickName: DataTypes.STRING,
// migración
nickName: { type: Sequelize.STRING }
```

**Impacto:**
Sin la restricción `unique`, la base de datos permite crear dos usuarios con el mismo `nickName`, lo que rompe la regla de negocio (el nick deja de identificar de forma única). La validación de Joi controla el formato, pero no puede garantizar unicidad a nivel de datos.

**Recomendación:**
Agregar la restricción en el modelo y en la migración:

```js
// modelo
nickName: { type: DataTypes.STRING, allowNull: false, unique: true }
// migración
nickName: { type: Sequelize.STRING, allowNull: false, unique: true }
```

---

### 2. No hay forma de asociar etiquetas (tags) a un post

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/controllers/post.controller.js`, `src/routes/tag.routes.js`, `src/models/posttag.js`

**Descripción:**
La relación muchos-a-muchos Post↔Tag está bien declarada en los modelos y existe el modelo intermedio `PostTag` (con su migración), pero **ningún endpoint la completa**: `Post.create(req.body)` solo guarda `description` y `userId` (de hecho, el `postSchema` solo permite esos dos campos), y no hay una ruta que ejecute `post.addTag(...)` ni que cree filas en `PostTags`. Como resultado, la tabla intermedia nunca se puebla.

**Impacto:**
Aunque al traer los posts se incluyen los tags (`include: [{ model: Tag }]`), en la práctica un post nunca puede tener etiquetas, porque no existe el camino para asociarlas. El enunciado pide específicamente “rutas para gestionar las relaciones entre entidades (… etiquetas a una publicación)”.

**Recomendación:**
Agregar un endpoint para asociar/quitar tags a un post, por ejemplo `POST /posts/:id/tags` que reciba uno o más `tagId` y use los métodos de la asociación:

```js
const post = await Post.findByPk(req.params.id);
await post.addTags(req.body.tagIds); // o addTag para uno solo
```

---

### 3. Detalles menores (para una próxima pasada)

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada

- **Integridad referencial:** al crear un post o comentario no se valida que el `userId`/`postId` existan; si no existen, hoy puede responder `500` por la restricción de la base. Un pequeño middleware de “existe por id” (similar al de validación que ya tienen) lo resolvería de forma prolija.
- **`src/main.js`** quedó como un `console.log` suelto; el punto de entrada real es `app.js`. Conviene eliminarlo para evitar confusión.
- **`months`** se lee del entorno como string; aunque funciona por coerción, `Number(process.env.COMMENT_VISIBLE_MONTHS) || 6` lo deja más explícito.

---

### A futuro (fuera del alcance de la materia)

Solo a modo informativo: el `password` se guarda tal cual (no era un requisito). Más adelante, con temas de seguridad, se suele guardar un *hash* (por ejemplo con `bcrypt`).

---

## Conclusión

Es una entrega muy completa y prolija, más aún habiéndola sostenido un solo integrante (Monzón): arquitectura clara, validación genérica reutilizable, la regla de negocio bien resuelta y configurable, documentación completa y un bonus. 🌟

Los dos puntos principales —marcar `nickName` como único y agregar el endpoint para asociar tags a un post— son acotados y dejan el trabajo redondo. ¡Felicitaciones por el esfuerzo y la prolijidad! 🚀
