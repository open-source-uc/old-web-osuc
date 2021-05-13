# Open Source UC

![Vercel](https://vercelbadge.vercel.app/api/open-source-uc/web)

This is the website for Open Source UC.

- **Production branch** (`main`): [osuc.dev](https://osuc.dev)
- **Staging branch** (`development`): [staging.osuc.dev](https://staging.osuc.dev/)

## Workflow

> tl;dr:
> El workflow es PR a development -> Revisar preview y checks -> Asignar reviewers -> Aprobación -> Merge a development

Detailed information on how to contribute can be found on [contributing.md](contributing.md) (in spanish).

## Miscellaneous

### Working with PWA support

If you're working with a browser that support PWA like chrome and a live server, must be activated the option update on reload in development tools.

![activate update on reload in Application tab](docs/img/pwa-workflow.png)

### Add or Remove members

To add or remove members modify the array in `assets/data/members-manifest.json`
