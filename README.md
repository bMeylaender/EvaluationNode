## Installation

Installer les packages :

```
npm install
```

Lancer un conteneur Docker avec la base de données PostgreSQL, à partir du docker-compose :

```
docker-compose up
```

Pour pouvoir accéder à la base de données, il nous faut l'url, que l'on va stocker dans un variable d'environnement `DATABASE_URL`.

On aura également besoin d'une variable d'environnement `JWT_SECRET` qui servira à hacher le JSON Web Token.

Ces variables d'environnement sont stockées dans un fichier `.env` à la racine du projet :

```
DATABASE_URL=postgresql://user:password@localhost:port/eval_db

JWT_SECRET="votre_clé"
```

Il faut ensuite générer le schema prisma :

```
npx prisma generate
```

Et pour créer les tables dans la base de données :

```
npx prisma migrate dev
```

Enfin, il faut lancer le serveur avec la commande :

```
node --env-file=.env app.js
```

(--env-file=.env nous permet d'avoir accès aux variables d'environnement se trouvant dans le fichier `.env`)

## Test de l'API

Une fois le serveur lancer on devrait voir dans la console :

```
Server Start : http://localhost:4000
```

le serveur tourne sur le port 4000.

On peut donc utiliser une application comme Postman pour réaliser nos requêtes.

Pour tester l'authentification :

```
POST /auth/register  →  Inscription (email, password, name)
POST /auth/login     →  Connexion (email, password), retourne un JWT
```

Créer plusieurs utilisateurs dont 1 avec un role "ADMIN" permettera de tester les permissions.

Pour tester une route qui a besoin d'authentification, copier le JWT obtenu avec `/login` et le mettre dans l'onglet `Authorization` de Postman dans le `Auth Type: Bearer Token `.

on a ensuite les CRUD :

Artistes :

```
GET    /artists          →  Liste des artistes (avec leurs albums)
GET    /artists/:id      →  Détail d'un artiste (avec ses albums)
POST   /artists          →  Créer un artiste (admin)
PUT    /artists/:id      →  Modifier un artiste (admin)
DELETE /artists/:id      →  Supprimer un artiste (admin)
```

Albums :

```
GET    /albums           →  Liste des albums (avec artiste)
GET    /albums/:id       →  Détail d'un album (avec artiste)
POST   /albums           →  Créer un album (authentifié)
PUT    /albums/:id       →  Modifier un album (authentifié)
DELETE /albums/:id       →  Supprimer un album (admin)
```

On peut ajouter un paramètre `?search=` dans le `GET /albums` pour pouvoir les albums : seul les albums ayant un titre contenant la chaîne de caractère du filtre seront affichés.

Pour la gestion des playlists :

```
POST   /playlists                     →  Créer une playlist (authentifié)
GET    /playlists/me                   →  Mes playlists (authentifié)
GET    /playlists/:id                  →  Détail d'une playlist (publique)
PUT    /playlists/:id                  →  Modifier une playlist (propriétaire)
DELETE /playlists/:id                  →  Supprimer une playlist (propriétaire)
POST   /playlists/:id/albums           →  Ajouter un album (propriétaire)
DELETE /playlists/:id/albums/:albumId  →  Retirer un album (propriétaire)
```
