<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Import wallet asset pointers through the shared wallet-logo map so wallet views keep consistent branding without service calls.

- Each screen lives in its own page module and TanStack content route; shared chrome and session state stay above the route outlet so navigation preserves the existing demo state.
- Keep `@lovable.dev/vite-tanstack-config` in package.json pinned to the version in bun.lock (currently 2.25.3); raising it to 2.26.5 makes install fail with `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` because the newer manifest can't be downloaded here.
