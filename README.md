# Himnario Adventista API

### ¿Qué es?

Es una API que permite obtener la letra y la música (instrumental y cantado) de las canciones del Himnario Adventista **Edición 2009**.

### ¿Cómo usarla?

La API se encuentra en la siguiente dirección: <https://sdah.my.to/hymn>.

### ¿Dónde está hosteada la música?

La música está hosteada en [Google Drive](https://drive.google.com/drive/folders/13Nvg5c6K7sR0gcOxYQk-BXoRkR82nzJV?usp=sharing) y está disponible para su descarga.

## Endpoints

| Método | Endpoint | Descripción |
| --- | --- | --- |
| ![GET](https://img.shields.io/badge/GET-0D96F6?style=for-the-badge) | [/hymn](https://sdah.my.to/hymn) | Devuelve un arreglo con todas las canciones. |

### Responses

| Código | Response |
| --- | --- |
| ![200](https://img.shields.io/badge/200-00C853?style=for-the-badge) | [Hymn[]](#esquemas) |

---

| Método | Endpoint | Descripción |
| --- | --- | --- |
| ![GET](https://img.shields.io/badge/GET-0D96F6?style=for-the-badge) | [/hymn/:number](https://sdah.my.to/hymn/1) | Devuelve la canción con el número especificado. |

### Responses

| Código | Response |
| --- | --- |
| ![200](https://img.shields.io/badge/200-00C853?style=for-the-badge) | [HymnHistory](#esquemas) |
| ![404](https://img.shields.io/badge/404-FF1744?style=for-the-badge)  | Hymn not found |

## Esquemas

```typescript
interface Hymn = {
  id:     number  // ID de la canción
  number: number  // número de la canción
  title:  string  // título de la canción
}
```

```typescript
interface HymnHistory =  {
  hymn: {
    id:          number  // ID de la canción
    number:      number  // número de la canción
    title:       string  // título de la canción
    mp3Url:      string  // URL del archivo mp3
    mp3UrlInstr: string  // URL del archivo mp3 con la pista instrumental
    mp3Filename: string  // nombre del archivo mp3
  }
  history: {
    position:    number  // orden de la estrofa
    timestamp:   number  // marca de tiempo en milisegundos del mp3
    verse: {
      number:    number  // número de la estrofa (0 si es el coro)
      content:   string  // contenido de la estrofa
    }
  }[]
}
```