# Security Policy

## Supported Versions

The following versions are supported for security maintenance:

| Component | Supported version |
| --- | --- |
| [McRetro.net](https://mcretro.net/) | Current live website deployed from `main` |
| [VRAMpage MD](https://mcretro.net/homepages/vrampage-md/) | **v0.5.0**, the version currently hosted on McRetro.net |

VRAMpage MD's development source and complete source-inclusive releases are maintained separately in [NixMcRetro/VRAMpage-MD](https://github.com/NixMcRetro/VRAMpage-MD). Reports affecting the hosted v0.5.0 application can be submitted here. Identify emulator-source or development-tooling issues as such so they can be handled in the authoritative repository.

Older website versions, historical software, and archived third-party source snapshots are provided for reference. Reports affecting them are welcome, but fixes for historical versions cannot be guaranteed.

## Reporting a Vulnerability

Please use [GitHub's private vulnerability reporting](https://github.com/NixMcRetro/mcretro.net/security/advisories/new) to disclose a suspected security vulnerability confidentially.

**Do not open a public issue or pull request containing undisclosed vulnerability details, working exploits, credentials, tokens, or personal information.**

A useful report includes:

- The affected page, feature, source file, or dependency, including its version when known.
- A clear description of the behaviour and its potential security impact.
- Reproduction steps and a minimal, non-destructive demonstration, where possible.
- Any relevant environment information or recommended mitigation.

Please avoid testing against other people's data or disrupting the live website.

## Handling Reports

Reports will be reviewed privately and assessed for impact on currently supported software. Confirmed problems may be fixed in the repository and disclosed after an appropriate remediation window. A specific response or remediation timeframe is not guaranteed.

Dependency findings can also be raised privately when their exploitability in the deployed website or released emulator is unclear.
