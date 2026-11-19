"""Stable, collision-safe public JXL names for existing McRetro photo originals.

Source files and already-converted local images are deliberately NOT renamed.
Only public R2 object keys and catalogue URLs use the new .jxl-only names.
JXL basenames are uppercase; extensions remain lowercase for web consistency.
"""
from __future__ import annotations

from collections import defaultdict
import hashlib
from pathlib import PurePosixPath


def public_photo_paths(source_paths: list[str]) -> dict[str, str]:
    """Return source-relative original path -> clean public .jxl or .gif path.

    For distinct sources with a shared directory/stem (e.g. scan.jpg and
    scan.png), append a stable content-independent SHA-256 source-path digest.
    Hashes are used only in colliding names, keeping ordinary URLs readable.
    """
    if len(source_paths) != len(set(source_paths)):
        raise ValueError('Duplicate original source path')
    candidates = {}
    groups = defaultdict(list)
    for source in source_paths:
        if (not isinstance(source, str) or not source or source.startswith('/')
                or any(c in source for c in ('?', '#', '\\', '\0', '\r', '\n'))
                or any(ord(c) < 32 or ord(c) == 127 for c in source)
                or any(p in ('', '.', '..') for p in source.split('/'))):
            raise ValueError('Unsafe original path: ' + repr(source))
        path = PurePosixPath(source)
        if path.suffix.lower() == '.gif':
            candidate = source
        else:
            candidate = str(path.with_name(path.stem.upper() + '.jxl'))
        candidates[source] = candidate
        groups[candidate.casefold()].append(source)

    outputs = {}
    reserved = {candidate.casefold() for candidate in candidates.values()
                if len(groups[candidate.casefold()]) == 1}
    used = set(reserved)
    # Deterministic in any input order.
    for source in sorted(source_paths):
        candidate = candidates[source]
        if len(groups[candidate.casefold()]) == 1:
            outputs[source] = candidate
            continue
        path = PurePosixPath(candidate)
        if path.suffix.lower() != '.jxl':
            raise ValueError('Unexpected collision on non-JXL item: ' + source)
        digest = hashlib.sha256(source.encode('utf-8')).hexdigest()
        for n in (10, 16, 24, 32, 64):
            proposed = str(path.with_name(path.stem + '-' + digest[:n].upper() + '.jxl'))
            if proposed.casefold() not in used:
                outputs[source] = proposed
                used.add(proposed.casefold())
                break
        else:
            raise ValueError('Unable to find a unique public name for: ' + source)
    if len({p.casefold() for p in outputs.values()}) != len(outputs):
        raise ValueError('Public names are not unique')
    return outputs
