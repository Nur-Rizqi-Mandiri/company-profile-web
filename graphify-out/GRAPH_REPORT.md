# Graph Report - company-profile-web  (2026-11-07)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 434 nodes · 866 edges · 40 communities (22 shown, 18 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `88eb981d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 19
- Community 20
- Community 21
- Community 22
- Community 26
- Community 27
- Community 30
- Community 33
- Community 35
- Community 36

## God Nodes (most connected - your core abstractions)
1. `resolve_plan_dir()` - 16 edges
2. `inject-plan.sh script` - 16 edges
3. `Injector` - 14 edges
4. `is_file()` - 13 edges
5. `is_within_root()` - 13 edges
6. `ClaudeDispatcher` - 12 edges
7. `opencode_catchup()` - 12 edges
8. `session_attached()` - 12 edges
9. `main()` - 11 edges
10. `safe_snapshot()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `inject()` --calls--> `Injector`  [EXTRACTED]
  .agent/skills/planning-with-files/scripts/inject-plan.py → .agent/skills/planning-with-files/scripts/inject-plan.py  _Bridges community 5 → community 7_
- `main()` --calls--> `ClaudeDispatcher`  [EXTRACTED]
  .agent/skills/planning-with-files/scripts/inject-plan.py → .agent/skills/planning-with-files/scripts/inject-plan.py  _Bridges community 7 → community 2_
- `find_current_codex_session()` --calls--> `os`  [EXTRACTED]
  .agent/skills/planning-with-files/scripts/session-catchup.py →   _Bridges community 0 → community 12_
- `resolve_plan_dir()` --calls--> `is_dir()`  [EXTRACTED]
  .agent/skills/planning-with-files/scripts/inject-plan.py → .agent/skills/planning-with-files/scripts/inject-plan.py  _Bridges community 12 → community 5_
- `main()` --calls--> `pretool_cache()`  [EXTRACTED]
  .agent/skills/planning-with-files/scripts/inject-plan.py → .agent/skills/planning-with-files/scripts/inject-plan.py  _Bridges community 2 → community 6_

## Import Cycles
- None detected.

## Communities (40 total, 18 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (42): _claude_sanitize(), claude_session_cwd(), codex_meta_cwd(), codex_planning_update(), collect_claude_tool_results(), configure_utf8_stdio(), emit_metadata_report(), extract_messages_after() (+34 more)

### Community 1 - "Community 1"
Cohesion: 0.19
Nodes (33): archived_count(), can_open(), canonicalize(), canonicalize_into(), current_active(), device_of(), fail(), file_metadata() (+25 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (12): Bail, hook_identity(), hook_is_main(), main(), normalize_wall_clock(), parse_args(), path_is_absolute_ish(), canonicalize() (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.24
Nodes (24): Add-PhaseStatus(), ConvertTo-AsciiJson(), Get-ArchivedCount(), Get-CurrentActivePlan(), Get-FinalPath(), Get-ListingCandidate(), Get-ListingFileMetadata(), Get-ListingSelection() (+16 more)

### Community 4 - "Community 4"
Cohesion: 0.20
Nodes (22): bounded_view(), cleanup_snapshot(), cleanup_snapshot_file(), emit_plan_head(), frame_file(), is_windowsapps_path(), is_within_root(), mode_has() (+14 more)

### Community 5 - "Community 5"
Cohesion: 0.19
Nodes (10): Injector, file_has_token(), mode_has(), mode_relax_allowed(), is_dir(), is_file(), is_link(), plan_is_ambiguous() (+2 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (8): _descriptor_final_path(), _identity(), _inside(), _normalized_windows_final(), pretool_cache(), safe_snapshot(), secure_progress_marker(), session_attached()

### Community 7 - "Community 7"
Cohesion: 0.21
Nodes (6): cache_dir(), ClaudeDispatcher, hook_json(), inject(), json_string(), system_message_json()

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (13): glob, file_glob, kind, value, cases, assertions, judge, name (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.29
Nodes (13): apply_v3_mode(), create_files_in(), gen_nonce(), inherit_root_mode(), print_v3_mode_status(), init-session.sh script, short_uuid(), slugify() (+5 more)

### Community 10 - "Community 10"
Cohesion: 0.35
Nodes (11): Assert-HandleParent(), Get-AttestationPath(), Open-SafeReadStream(), Open-TrustedDirectory(), Read-SafeText(), Remove-SafeFile(), Resolve-ContainedPlanFile(), Resolve-PlanFile() (+3 more)

### Community 11 - "Community 11"
Cohesion: 0.42
Nodes (11): canonicalize(), is_windowsapps_path(), is_within_root(), mtime_of(), norm_slashes(), resolve_from_active_file(), resolve_from_env(), resolve_latest_dir() (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.20
Nodes (5): mtime_seconds(), pin_is_absolute(), resolve_plan_dir(), shell_pwd(), strip_ws()

### Community 13 - "Community 13"
Cohesion: 0.29
Nodes (8): applyConfig(), applyTranslations(), initGlobalImagePreview(), initScripts(), initScrollTop(), loadAll(), loadSection(), sections

### Community 14 - "Community 14"
Cohesion: 0.38
Nodes (9): append_line(), iso_utc(), json_escape(), max_tick_in_dir(), resolve_plan_dir(), sanitize_agent(), ledger-append.sh script, usage() (+1 more)

### Community 15 - "Community 15"
Cohesion: 0.22
Nodes (3): head_lines(), line_count(), smart_plan_extract()

### Community 16 - "Community 16"
Cohesion: 0.39
Nodes (7): acquire_lock(), claim_lock_owner(), do_write(), resolve_plan_file(), rewrite(), phase-status.sh script, usage()

### Community 17 - "Community 17"
Cohesion: 0.50
Nodes (7): attestation_path_for(), compute_hash(), resolve_from_slug_cwd(), resolve_plan_file(), attest-plan.sh script, slug_is_valid(), usage_error()

### Community 19 - "Community 19"
Cohesion: 0.52
Nodes (5): addListeners(), handleEnd(), handleMove(), handleStart(), updateCarousel()

### Community 20 - "Community 20"
Cohesion: 0.60
Nodes (5): advisory_report(), first_in_progress_phase(), json_escape(), ledger_line_count(), check-complete.sh script

### Community 21 - "Community 21"
Cohesion: 0.60
Nodes (5): fail(), info(), ok(), plan-doctor.sh script, warn()

### Community 26 - "Community 26"
Cohesion: 0.83
Nodes (3): select_python(), select_python_into_var(), skill-hook.sh script

## Knowledge Gaps
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `session_attached()` connect `Community 6` to `Community 0`, `Community 2`, `Community 12`, `Community 5`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05462962962962963 - nodes in this community are weakly interconnected._
- **Why does `resolve_plan_dir()` connect `Community 12` to `Community 2`, `Community 5`, `Community 7`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09666666666666666 - nodes in this community are weakly interconnected._
- **Why does `Injector` connect `Community 5` to `Community 2`, `Community 15`, `Community 7`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.11428571428571428 - nodes in this community are weakly interconnected._
- **Should `Community 8` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._