# `/landing-2` asset manifest

All supplied imagery was inspected for dimensions, alpha, visible bounds, anchor, and compositing suitability. “Unused” means the file remains untouched and is not downloaded by this route.

## Active world and UI assets

| Role | Asset | Dimensions / alpha | Visible bounds | Anchor | Depth / use |
| --- | --- | --- | --- | --- | --- |
| `00-frame-sequence` | `/images/landing-2/sequence/frame-0001.webp` … `frame-0379.webp` | 379 opaque RGB WebPs, 1280×720 each, 15.69 MiB total | full 16:9 frame | stable center | The only world layer: 12 fps aircraft-window, cloud, campus, gate, corridor, and classroom frames drawn with cover geometry. |
| atmosphere / grain | CSS overlays | viewport, procedural | full | full frame | Static vignette, restrained texture, and light bridge. |
| `10-black-readability` | CSS pure-black overlay | viewport | full | full frame | Timeline-controlled text contrast, 14–48% opacity, z-index 12. |
| catalog | `/images/normal/esim.jpg` | 1000×700, opaque RGB | full | center | Late UI card, not a world layer. |
| catalog | `/images/normal/banking.jpg` | 1000×700, opaque RGB | full | center | Late UI card, not a world layer. |
| catalog | `/images/normal/housing.jpg` | 1000×700, opaque RGB | full | center | Late UI card, not a world layer. |
| catalog | `/images/normal/insurance.jpg` | 1000×700, opaque RGB | full | center | Late UI card, not a world layer. |
| catalog | `/images/normal/forex.jpg` | 1000×700, opaque RGB | full | center | Late UI card, not a world layer. |
| catalog | `/images/normal/loans.jpg` | 1000×700, opaque RGB | full | center | Late UI card, not a world layer. |
| catalog | `/images/normal/tax.jpg` | 1000×700, opaque RGB | full | center | Late UI card, not a world layer. |
| catalog | `/images/normal/visa.jpg` | 1000×700, opaque RGB | full | center | Late UI card, not a world layer. |

## Audited unused imagery

| Asset | Dimensions / alpha | Visible bounds | Likely role / anchor | Decision |
| --- | --- | --- | --- | --- |
| `/images/landing-2/flight-window.webp` | 1536×1024, opaque RGB | full | former opening plate, center | Unused by the route; replaced by supplied-video frames. |
| `/images/landing-2/campus-aerial.webp` | 1536×1024, opaque RGB | full | former aerial plate, center | Unused by the route; replaced by supplied-video frames. |
| `/images/landing-2/classroom-interior.webp` | 1536×1024, opaque RGB | full | former classroom poster, center | Unused by the route; replaced by supplied-video frames. |
| `/images/atlas-departure.jpg` | 1586×992, opaque RGB | full | alternate background, center | Unused; weaker subject crop than active plate. |
| `/images/banner.png` | 627×581, opaque RGB | full | product UI, center | Unused; embedded interface does not share the airport camera. |
| `/images/crm.png` | 1144×575, opaque RGB | full | product UI, center | Unused; product screenshot, not a depth layer. |
| `/images/feature-1.png` | 556×457, opaque RGB | full | product UI, center | Unused; product screenshot. |
| `/images/feature-2.png` | 658×657, opaque RGB | full | product UI, center | Unused; product screenshot. |
| `/images/footer.png` | 360×38, opaque RGB | full | wordmark strip, center | Unused; contains text. |
| `/images/hand.png` | 360×500, opaque RGB | full | phone/UI object, bottom | Unused; no transparency and contains UI text. |
| `/images/industries/contruction.png` | 360×76, opaque RGB | full | Housing service strip, center | Unused; contains baked UI text. |
| `/images/industries/digital-marketing.png` | 360×76, opaque RGB | full | Loans service strip, center | Unused; contains baked UI text. |
| `/images/industries/ecom.png` | 360×76, opaque RGB | full | Forex service strip, center | Unused; contains baked UI text. |
| `/images/industries/education.png` | 360×76, opaque RGB | full | Visas service strip, center | Unused; contains baked UI text. |
| `/images/industries/it-saas.png` | 360×76, opaque RGB | full | Insurance service strip, center | Unused; contains baked UI text. |
| `/images/industries/logistics.png` | 360×76, opaque RGB | full | Tax service strip, center | Unused; contains baked UI text. |
| `/images/industries/manufactor.png` | 360×76, opaque RGB | full | Banking service strip, center | Unused; contains baked UI text. |
| `/images/industries/solar.png` | 360×76, opaque RGB | full | SIM service strip, center | Unused; contains baked UI text. |
| `/images/normal/atlas-wordmark.png` | 2105×747, RGBA | `(120,214)–(1986,520)`, 18.7% coverage | wordmark, center | Unused; UI text stays semantic HTML. |
| `/images/normal/career.jpg` | 1200×900, opaque RGB | full | narrative photograph, center | Unused; interview room does not match the airport camera. |
| `/images/normal/cta-student-cutout-v2.png` | 1024×1536, RGBA | `(221,107)–(773,1388)`, 23.9% coverage | isolated traveler, bottom center | Unused; duplicates the plate’s traveler and light does not fully align. |
| `/images/normal/cta-student-cutout-v3.png` | 1024×1536, RGBA | `(222,108)–(772,1387)`, 23.4% coverage | isolated traveler, bottom center | Unused; duplicate alternate of v2. |
| `/images/normal/phone-hand-source.jpg` | 1200×1600, opaque RGB | full | source photo, lower-right | Unused; active transparent derivative is cleaner. |
| `/images/normal/product-planning.jpg` | 1400×900, opaque RGB | full | planning scene, center | Unused; unrelated indoor camera. |
| `/images/normal/service-planning.jpg` | 1200×900, opaque RGB | full | success scene, center | Unused; unrelated outdoor camera. |
| `/images/normal/subscription-phone-hand.png` | 1024×1536, RGBA | `(200,133)–(1024,1536)`, 42.9% coverage | phone/hand, lower-right | Unused; baked interface text conflicts with semantic UI rule. |
| `/images/premium/student-peeps.png` | 3600×2268, RGBA | `(0,29)–(3600,2235)`, 36.5% coverage | illustrated crowd, bottom center | Unused; illustration style does not match the photographic world. |
| `/images/premium/services/banking.png` | 772×972, opaque RGB | full | illustrated service card, center | Unused; illustration style mismatch. |
| `/images/premium/services/forex.png` | 772×972, opaque RGB | full | illustrated service card, center | Unused; illustration style mismatch. |
| `/images/premium/services/housing.png` | 772×972, opaque RGB | full | illustrated service card, center | Unused; illustration style mismatch. |
| `/images/premium/services/insurance.png` | 772×972, opaque RGB | full | illustrated service card, center | Unused; illustration style mismatch. |
| `/images/premium/services/loans.png` | 772×972, opaque RGB | full | illustrated service card, center | Unused; illustration style mismatch. |
| `/images/premium/services/sim-esim.png` | 772×972, opaque RGB | full | illustrated service card, center | Unused; illustration style mismatch. |
| `/images/premium/services/tax-filing.png` | 772×972, opaque RGB | full | illustrated service card, center | Unused; illustration style mismatch. |
| `/images/premium/services/visas.png` | 772×972, opaque RGB | full | illustrated service card, center | Unused; illustration style mismatch. |

## Reference media

`/Users/mirzah/Downloads/Initial_Scene_-_2026-07-27_202607271802.mp4` is the user-supplied 1280×720 H.264 source, 31.59 seconds at 24 fps. The shipped route assets sample it at 12 fps; source audio is not used.

## Production replacements

No placeholder is active. Replace the complete numbered sequence and update `FRAME_SEQUENCE.count` together if the production source changes.
