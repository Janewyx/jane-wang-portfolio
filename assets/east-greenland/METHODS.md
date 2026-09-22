# Method, selection and QA record

## AOI selection before implementation

The first inspected image was `20220824T133729_20220824T133723_T26XNF`, with scene cloudiness 0.194277%. It showed a glacier tongue approaching a sediment-covered valley, meltwater ponds, and small bright patches on the valley floor. This confirmed a useful snow/ice-like feature in a mixed proglacial setting. The centre was not moved. A provisional 1.2 km inspection buffer was enlarged to 1.5 km to include more of the terminus edge and valley-floor patches. The final AOI includes a small part of the glacier tongue deliberately: the mapped class is not exclusively proglacial ice.

`src/make_aoi.py` transforms the independently supplied centre to WGS84 / UTM zone 26N and constructs metric AOI parameters. Earth Engine constructs the analysis circle with a 1 m projected buffer tolerance. `data/aois.geojson` is a 96-segment display approximation of that circle, not a separate statistical boundary. The context AOI is a projected square, ±6 km in x and y. The context figure has a ±6.8 km display extent to show its outline; seasonal and interannual figures use ±2.3 km. Python overlay distances are metres in the same projection. North arrows indicate **grid north**.

## Raster processing

1. Select the Sentinel-2 surface-reflectance harmonized collection for the analysis AOI, dates `[2018-01-01, 2026-01-01)`, July–September, and `CLOUDY_PIXEL_PERCENTAGE < 30`.
2. Join Cloud Score+ `cs_cdf` by matching system index. Missing QA is unusable, never automatically clear.
3. Use a fixed 20 m UTM grid for classification, connected-pixel counting and area reduction. Scale reflectance by 0.0001. Aggregate B2/B3/B4 to 20 m by mean; resample B11/SCL to the grid with nearest-neighbour sampling. Aggregate the Cloud Score+ score conservatively using the minimum.
4. Usable pixels require valid reflectance coverage, `cs_cdf >= 0.60`, and SCL not in 0, 1, 2, 3, 8, 9, 10. This excludes invalid/saturated pixels, dark/shadow pixels, clouds and cirrus. **SCL 11 is retained** so snow/ice is not removed by QA.
5. Calculate `(B3 - B11)/(B3 + B11)` using arithmetic rather than implicit masking of negative inputs. Candidate pixels require NDSI >0.4 and mean(B2, B3, B4) >0.2, within usable pixels. SCL 6 water is vetoed from the candidate class but remains usable, observed noncandidate area. This can also omit mixed/ice-covered water pixels mislabelled by SCL.
6. Retain 8-connected candidate patches of at least three 20 m pixels (nominal 1,200 m²). Filtering precedes clipping to the analysis AOI; a retained patch crossing the boundary may contribute less than the full patch minimum inside the AOI.
7. Sum `pixelArea()` over candidate, usable and covered pixels. Divide by the same grid-weighted **full analysis AOI area** (706.9376 ha). No best-effort coarsening is used.

`qa_excluded_percent = 100 - usable_percent` includes clouds, shadows, invalid coverage and missing/failed cloud-quality information. It is not a pure cloud-fraction measurement. Missing reflectance coverage is also reported separately. Candidate percent is the observed candidate area divided by the full AOI; it is not extrapolated over excluded pixels. Thus even valid scenes have a small unobserved portion when usable area is below 100%.

## Scene, monthly and yearly interpretation

Every eligible scene has date, year, month, candidate area/percent, usable area/percent, excluded area/percent, coverage, quality and source ID in the scene JSON. A scene is **Uncertain** below 90% usable area. Raw candidate measurements in such scenes are retained for QA only; the monthly interpretation never converts them into evidence of absence.

Within each year-month, rank by validity first, then higher usable percent, lower excluded percent, higher mean local Cloud Score+, lower scene cloudiness, earliest acquisition time and finally source ID. Fixed-width rank fields compare quality to six decimal places. Excluded percent is algebraically redundant with usable percent but is retained explicitly to match the documented hierarchy. The lower scene-cloud fraction is only a tie-breaker; it never overrides local usable area. The last source-ID tie-breaker resolves equal timestamps. There is no month-end preference.

If no scene is usable, the monthly row is Uncertain and candidate fields are blank; the best uncertain scene's QA diagnostics are retained where available. Months with no eligible scenes have blank dates and QA values. No interpolation is performed. Multiple granules remain separate observations; no temporal mosaic is used for statistics. The current AOI yields one relevant tile per acquisition.

Yearly outputs report only the latest month with observed candidate cover, valid September availability and coverage, the number of valid monthly observations, and insufficient-imagery wording where needed. Here, the latest observed month is September in all eight years. That does not establish survival from July.

| Screening class | Candidate % in a usable scene |
|---|---:|
| No | 0 after patch filtering |
| Trace | >0 to <1 |
| Minor | ≥1 to <10 |
| Yes | ≥10 to <30 |
| Strong Yes | ≥30 |
| Uncertain | <90% usable area, or no imagery |

These are visualization bins, not process thresholds. The heatmap prints `<1%` for Trace so rounding cannot misrepresent a nonzero observation as zero.

## Visual QA and checks

True colour and candidate overlays were inspected for July–September 2024, September 2020/2021/2022, July 2018, and the initial August 2022 context. The water veto was added after initial imagery review revealed pond false positives. The broad bright September 2021 cover is consistent with snow-covered terrain; snowfall timing cannot be identified from a single selected image. The 2024 triptych was chosen for a legible seasonal contrast, not as a representative estimate for every year. Four September maps show low and high coverage without a trend claim.

`src/audit.py` independently reconciles scene and monthly rankings, QA area balance, candidate hectares/percent, classification bins, missing months and yearly summaries. The supplied result passes these checks. Tiny floating-point percentage errors below 1e-6 are clipped to [0,100] when formatting the CSV; raw scene JSON remains available. These checks do not replace ground truth or an accuracy assessment.

All published maps share a fixed RGB stretch (0–0.45 reflectance, gamma 1.2), a turquoise candidate overlay and brown QA-excluded shading. Only rendered 1,600-pixel display previews leave Earth Engine, then Matplotlib adds cartographic elements. Display previews have no scientific raster bands or georeferencing and are not used to calculate statistics.
