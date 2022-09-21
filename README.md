# Monorepo (esm-loaders)

This is a Monorepo for my ESModule Loaders.

# Packages

ESModule Loaders are in the [`packages/`][packages] directory:

- [esm-loader-css][esm-loader-css]
- [esm-loader-images][esm-loader-images]
- [esm-loader-import-alias][esm-loader-import-alias]
- [esm-loader-import-meta-custom][esm-loader-import-meta-custom]
- [esm-loader-import-relative-extension][esm-loader-import-relative-extension]
- [esm-loader-json][esm-loader-json]
- [esm-loader-mock-exports][esm-loader-mock-exports]
- [esm-loader-svelte][esm-loader-svelte]
- [esm-loader-typescript][esm-loader-typescript]

# Develop

```sh
git clone https://github.com/brev/esm-loaders.git
cd esm-loaders/
npm install -g pnpm
pnpm -r install
pnpm -r clean
pnpm -r format
pnpm -r lint
pnpm -r test:cover
pnpm -r build
```

# License

[MIT][mit-license]

[esm-loader-css]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-css#readme
[esm-loader-images]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-images#readme
[esm-loader-import-alias]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-import-alias#readme
[esm-loader-import-meta-custom]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-import-meta-custom#readme
[esm-loader-import-relative-extension]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-import-relative-extension#readme
[esm-loader-json]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-json#readme
[esm-loader-mock-exports]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-mock-exports#readme
[esm-loader-svelte]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-svelte#readme
[esm-loader-typescript]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-typescript#readme
[mit-license]: https://mit-license.org/
[packages]: https://github.com/brev/esm-loaders/tree/main/packages

