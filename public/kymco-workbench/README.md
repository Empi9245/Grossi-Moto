# KYMCO Workbench Assets

Queste cartelle contengono copie operative degli asset KYMCO usati dal sito.
Gli originali restano nelle loro cartelle sorgente.

## Cartelle

- `catalog-products-originals/`: immagini KYMCO senza sfondo usate nelle card catalogo/prodotti.
- `home-showroom-originals/`: immagini KYMCO usate nella sezione showroom della home.

Ogni cartella contiene un `asset-map.json` con:

- ordine;
- id modello;
- nome modello;
- path sorgente originale;
- path della copia.

## Uso

Le immagini `catalog-products-originals/*_no_bg.png` sono collegate al catalogo tramite `src/data/catalog-scooters.ts`.
Usare `home-showroom-originals/` per eventuale upscale o lavorazione delle immagini showroom home; quando gli asset home finali sono pronti, aggiornare i path in `src/data/showcase-scooters.ts`.
