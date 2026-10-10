# Full Stack Open — Part 2

Final applications for the courseinfo, phonebook and countries exercises, prepared for review and course submission. No deployment, production data or live secret is included.

| App | Intended exercise coverage | Run |
| --- | --- | --- |
| courseinfo | 2.1–2.5, arbitrary course/part lists, reduce total, separate Course module | npm install; npm run dev |
| phonebook | 2.6–2.17, forms/filter, axios service, JSON server CRUD/confirmation, notifications and concurrent deletion handling | npm install; npm run server in one terminal; npm run dev in another |
| countries | 2.18–2.20, query/list/show/detail, capital weather | npm install; npm run dev |

All apps support `npm run build` and `npm run lint`. Phonebook uses only fictional course sample data in db.json. Its JSON server binds to localhost; optional VITE_PHONEBOOK_URL can point at a different local test port. Never enter real contact details into this practice server.

Countries uses the official Helsinki REST Countries endpoint and Open-Meteo's public weather API for this non-commercial educational draft. No API key or paid signup is required. Coordinates come from capitalInfo where available, with an Open-Meteo geocoding fallback. It makes real external requests; weather is not fabricated. Failed requests show an error and the country detail remains available.

Official sources inspected:
- https://fullstackopen.com/en/part2/rendering_a_collection_modules/
- https://fullstackopen.com/en/part2/forms/
- https://fullstackopen.com/en/part2/getting_data_from_server/
- https://fullstackopen.com/en/part2/altering_data_in_server/
- https://fullstackopen.com/en/part2/adding_styles_to_react_app/
- https://studies.cs.helsinki.fi/restcountries/
- https://open-meteo.com/en/docs
- https://open-meteo.com/en/docs/geocoding-api

Validation is recorded below once performed. Intended coverage is not platform completion.

## Validation — 11 October 2026

All three apps passed production builds and oxlint. Browser checks used one localhost-only preview server on port 5188, now stopped; the temporary phonebook backend used a disposable copy of db.json. A VITE_PHONEBOOK_URL override pointed the tested build at that server because another process already occupied port 3001; the source defaults remain localhost:3001.

- Courseinfo displayed both courses with totals 42 and 10, including the four-part first course.
- Phonebook fetched the initial four entries, filtered Ada using mixed case, created and persisted a fictional Practice Tester after reload, cancelled then confirmed a duplicate number replacement, and deleted after confirmation. A second stale browser client attempted to update the deleted entry: it displayed the red error "Practice Tester was already removed from the server." and removed the stale row. The disposable fixture was deleted at the end.
- Countries fetched the real country list. Broad query `land` produced the too-many-matches message; `fin` displayed Finland, Helsinki, area, languages and flag. The real Open-Meteo response displayed temperature, wind and an API timestamp. Query `sw` produced four matches, the show Sweden button opened its details, and a nonexistent query displayed No matches.

Browser validation covered course totals, concurrent phonebook deletion errors and real Helsinki weather. Builds, tests and intended exercise coverage do not establish platform submission.

The phonebook uses an accessible in-page Confirm/Cancel dialogue for replacements and deletion. It preserves the confirmation behavior required by the exercises while allowing keyboard and automated UI testing without browser-native modal interception.
