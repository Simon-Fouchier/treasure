## Bienvenue au jeu La carte aux trésors de la Madre de Dios

 ### Prérequis
- Installer Volta
```bash
# install Volta
curl https://get.volta.sh | bash
```
J'utilise Ubuntu 22.05.
Si jamais vous êtes sur Windows et que Volta n'est pas compatible. Voici les versions nécessaire pour le projet:
- node: "18.14.2",
- pnpm: "7.28.0"


## Executer le projet
```bash
pnpm i && pnpm start <FILE-PATH>
```

### Récupérer les résultats
Le résultat est contenu dans le répertoire `results`

## Lancer les tests
```bash
pnpm test
```
Avec coverage
```bash
pnpm test:coverage
```
