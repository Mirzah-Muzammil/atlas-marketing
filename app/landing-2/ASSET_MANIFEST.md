# `/landing-2` asset manifest

All supplied imagery was inspected for dimensions, alpha, visible bounds, anchor, and compositing suitability. “Unused” means the file remains untouched and is not downloaded by this route.

## Active world and UI assets

| Role | Asset | Dimensions / alpha | Visible bounds | Anchor | Depth / use |
| --- | --- | --- | --- | --- | --- |
| `00-flight-window` | `/images/landing-2/flight-window.webp` | 1536×1024, opaque RGB, 44 kB | full | center 50% 54% | Opening foreground/camera frame. Generated project plate; critical and preloaded. |
| `10-campus-aerial` | `/images/landing-2/campus-aerial.webp` | 1536×1024, opaque RGB, 176 kB | full | centered skylight, origin 50% 66% | Sky-to-roof descent plate; the glazed roof is the push-through anchor. |
| `20-classroom-interior` | `/images/landing-2/classroom-interior.webp` | 1536×1024, opaque RGB, 144 kB | full | centered aisle, origin 50% 58% | Stable poster revealed through the roof window. |
| `30-classroom-video` | `/videos/atlas-student-study.mp4` | 1080×2048, opaque H.264, 14.88 s | full portrait frame | center 50% 44% | Scroll-scrubbed classroom destination; plays only at the final state. |
| `50-mobile-flight-frame` | CSS aperture | viewport-relative | portrait inset | center 50% 54% | Mobile-only cabin frame that preserves the aircraft-window read after portrait cropping. |
| atmosphere / grain | CSS overlays | viewport, procedural | full | full frame | Static vignette, restrained texture, and light bridge. |
| tint / shade | CSS solid overlay | viewport | full | full frame | Focus and legibility, z-index 12. |
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

`/videos/atlas-student-study.mp4` is 1080×2048, H.264, 14.88 seconds, opaque YUV420. It is the active moving classroom layer and is controlled by local scroll progress.

## Production replacements

No placeholder is active. The flight, aerial campus, and classroom poster share a centered camera path and dawn-to-interior grade. Keep the skylight and classroom subject centered when replacing either active destination asset.
