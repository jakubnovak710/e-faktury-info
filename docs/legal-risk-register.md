# Legal Risk Register — e-faktury.info

Prevádzkovateľ: 8888 Servis s.r.o., IČO 55609830

## Posúdenie rizík

| Riziko | Zákon | Závažnosť | Pravdepodobnosť | Mitigácia | Stav |
|--------|-------|-----------|------------------|-----------|------|
| Čitateľ sa spolieha na nesprávny obsah a utrpí škodu | § 420 + § 441 OZ | NÍZKA (s disclaimerom) | Veľmi nízka | Disclaimer na každej stránke, lastUpdated dátumy, odkaz na SAK | Implementované |
| Obvinenie z neoprávneného poskytovania právnych služieb | § 2 zákona č. 586/2003 Z.z. | NÍZKA | Veľmi nízka | Disclaimer explicitne odkazuje na zákon o advokácii, žiadne individuálne rady | Implementované |
| Nepresný popis spracovania analytických údajov | GDPR čl. 13-14 | STREDNÁ | Stredná | Privacy policy aktualizovaná: self-hosted Umami na Hetzner (EÚ), DPA | Implementované |
| Newsletter sponzorovaný obsah neoznačený | § 7 zákona č. 22/2004 Z.z. | STREDNÁ | Stredná | Disclosure v obchodných podmienkach + privacy policy, označovanie v emailoch | Implementované |
| Chýbajúci consent record pre newsletter | GDPR čl. 7 ods. 1 | STREDNÁ | Stredná | API loguje timestamp, IP, verziu súhlasu, consent checkbox v modáli | Implementované |
| Newsletter opt-in nie je GDPR-compliant | GDPR C-673/17 Planet49, § 116 zákona č. 351/2011 | VYSOKÁ | Nízka | Checkbox unchecked by default, povinný pred odoslaním, presné znenie súhlasu | Implementované |

## Právne základy

### Prečo je riziko pre prevádzkovateľa nízke

1. **§ 420 OZ** — na vznik zodpovednosti za škodu musia byť splnené 4 podmienky: protiprávny úkon, škoda, príčinná súvislosť, zavinenie. Publikovanie verejne dostupných informácií nie je protiprávne.
2. **§ 441 OZ** — spoluzavinenie poškodeného. Kto sa spolieha na bezplatný web namiesto advokáta, nesie časť zodpovednosti.
3. **Zákon č. 586/2003 Z.z. § 1-2** — obmedzuje len právne služby (poradenstvo konkrétnej osobe), nie informačný obsah.
4. **Zákon č. 185/2015 Z.z. § 5** — právne texty sú vyňaté z autorského práva.
5. **Zákon č. 22/2004 Z.z. § 11** — žiadna povinnosť monitorovať presnosť obsahu.
6. **Čl. 26 Ústavy SR** — sloboda prejavu chráni publikovanie informácií o zákonoch.

### Newsletter — ad space model

- Firmy kupujú reklamný priestor, emaily sa nezdieľajú → žiadne DPA s inzerentmi
- Právny základ pre spracovanie: súhlas (čl. 6 ods. 1 písm. a) GDPR)
- Obchodné oznámenia označené podľa § 7 zákona č. 22/2004 Z.z.

## Posledná aktualizácia

20. marca 2026
