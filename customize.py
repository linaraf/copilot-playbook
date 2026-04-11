#!/usr/bin/env python3
"""
Copilot Playbook Customizer
Replaces all placeholders in the markdown files with your company's details.
Output is written to an ./output/ folder — originals are never modified.
"""

import os
import shutil
import argparse
from datetime import date

PLACEHOLDERS = {
    "[Company Name]": "company_name",
    "[AI Guru name]": "guru_name",
    "[IT Contact]": "it_contact",
    "[Date]": "date",
    "[form link]": "form_link",
}

MD_FILES = [
    "01-sharepoint-build-guide.md",
    "02-starter-prompt-library.md",
    "03-learning-paths.md",
    "04-onenote-journal-template.md",
    "05-governance-content.md",
    "06-starter-use-cases.md",
    "07-agents-tools-directory.md",
    "08-gamification-monthly-challenge.md",
]


def prompt_for_values():
    print("\nCopilot Playbook Customizer")
    print("=" * 40)
    print("Press Enter to keep the placeholder for any field you want to fill in later.\n")

    values = {}
    values["company_name"] = input("Company Name:    ").strip() or "[Company Name]"
    values["guru_name"]    = input("AI Guru Name:    ").strip() or "[AI Guru name]"
    values["it_contact"]   = input("IT Contact:      ").strip() or "[IT Contact]"
    values["date"]         = input(f"Date [{date.today()}]: ").strip() or str(date.today())
    values["form_link"]    = input("Form Link (URL): ").strip() or "[form link]"
    return values


def customize(src_dir, out_dir, values):
    os.makedirs(out_dir, exist_ok=True)

    replacements = {placeholder: values[key] for placeholder, key in PLACEHOLDERS.items()}

    changed_files = []
    for filename in MD_FILES:
        src = os.path.join(src_dir, filename)
        dst = os.path.join(out_dir, filename)

        if not os.path.exists(src):
            print(f"  [skip] {filename} not found")
            continue

        with open(src, "r", encoding="utf-8") as f:
            content = f.read()

        updated = content
        for placeholder, value in replacements.items():
            updated = updated.replace(placeholder, value)

        with open(dst, "w", encoding="utf-8") as f:
            f.write(updated)

        if updated != content:
            changed_files.append(filename)

    # Copy README as-is
    readme_src = os.path.join(src_dir, "00-README.md")
    if os.path.exists(readme_src):
        shutil.copy(readme_src, os.path.join(out_dir, "00-README.md"))

    return changed_files


def check_remaining(out_dir):
    """Report any placeholders still present in the output files."""
    remaining = {}
    for filename in MD_FILES:  # README is excluded — its placeholders are instructional
        path = os.path.join(out_dir, filename)
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        found = [p for p in PLACEHOLDERS if p in content]
        if found:
            remaining[filename] = found
    return remaining


def main():
    parser = argparse.ArgumentParser(description="Customize the Copilot Playbook markdown files.")
    parser.add_argument("--company",  help="Company name")
    parser.add_argument("--guru",     help="AI Guru name")
    parser.add_argument("--contact",  help="IT contact name or email")
    parser.add_argument("--date",     help="Date string (default: today)")
    parser.add_argument("--form",     help="Microsoft Forms URL")
    parser.add_argument("--out",      default="output", help="Output folder (default: ./output)")
    args = parser.parse_args()

    # Use CLI args if provided, otherwise prompt interactively
    if any([args.company, args.guru, args.contact, args.date, args.form]):
        values = {
            "company_name": args.company  or "[Company Name]",
            "guru_name":    args.guru     or "[AI Guru name]",
            "it_contact":   args.contact  or "[IT Contact]",
            "date":         args.date     or str(date.today()),
            "form_link":    args.form     or "[form link]",
        }
    else:
        values = prompt_for_values()

    src_dir = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(src_dir, args.out)

    print(f"\nWriting customized files to ./{args.out}/")
    changed = customize(src_dir, out_dir, values)

    print(f"\nDone. {len(changed)} file(s) updated:")
    for f in changed:
        print(f"  {f}")

    remaining = check_remaining(out_dir)
    if remaining:
        print("\nUnfilled placeholders remaining:")
        for filename, placeholders in remaining.items():
            print(f"  {filename}: {', '.join(placeholders)}")
    else:
        print("\nAll placeholders filled.")


if __name__ == "__main__":
    main()
