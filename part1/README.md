# Full Stack Open — Part 1

Final React applications for the courseinfo, unicafe and anecdotes exercises, with build, lint and browser validation recorded below.

| App | Exercises | Final behavior |
| --- | --- | --- |
| courseinfo | 1.1–1.5 | Header, Content, Part, Total; object/array props; total 31 |
| unicafe | 1.6–1.11 | Feedback state, empty-state branch, average, positive percentage, table rows |
| anecdotes | 1.12–1.14 | Random selection, immutable votes, most-voted display |

Anecdotes uses original practice sentences. Each app runs with `npm ci`, `npm run dev`, `npm run build`, `npm run lint`. Only the final application is included, as permitted by the course's submission instructions.

All three production builds and lint checks passed. Browser checks confirmed courseinfo's total, unicafe's zero feedback and 2/1/1 feedback result (total 4, average .25, positive 50%), and anecdote vote persistence/most-voted updates. Refresh resets state. No external service or production deployment is required.

Official materials reviewed:
- https://fullstackopen.com/en/part1/introduction_to_react/
- https://fullstackopen.com/en/part1/java_script/
- https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps/

Time reported in a platform submission is an estimate for preparation and checking, not personally measured learner time. This repository does not establish university credit.
